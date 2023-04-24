
import type { NextApiRequest, NextApiResponse } from "next"; 
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import prisma from '../../../prisma/client'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
){

    if(req.method === "GET"){
        const session=await getServerSession(req,res,authOptions);
        if(!session) return res.status(401).json({message:"Please sign in to add a post"});
        const title:string=req.body.title;

        //Get User
        const prismaUser=await prisma.user.findUnique({
            where:{email:session?.user?.email}
        });

        //Get a Image post
        try{
            const result=await prisma.image.findMany({
                include:{
                    user:true,
                    comments:true
                }
            })
            res.status(200).json(result)
        }catch(err){
            res.status(403).json({err:"Error has occurred while getting posts"})
        }
    }
}