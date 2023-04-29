import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import prisma from '../../../prisma/client'


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
){
    if(req.method==="GET"){
        const session=await getServerSession(req,res,authOptions);
        if(!session) return res.status(401).json({message:"Please sign in for getting comments"});
        const imageId:number=Number(req.query.imageId);

        //Get User
        const prismaUser=await prisma.user.findUnique({
            where:{email:session?.user?.email}
        });

        //Get a Comment for a image
        try{
            const result=await prisma.comment.findMany({
                
                
            })
            res.status(200).json(result)
        }
        catch(err){
            res.status(403).json({err:"Error has occurred while getting comments"})
        }
    }
}