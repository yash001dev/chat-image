
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
        
        const imageId:number=Number(req.query.imageId);
        console.log("IMAGE ID:",imageId)
        //Get a Image post
        try{
            const result=await prisma.image.findMany({
                where:{
                    id:imageId,
                },
                include:{
                    user:true,
                    comments:true
                }
            })
            
            res.status(200).json(result)
        }catch(err){
            console.log("IT IS GOING HEREL")
            res.status(403).json({err:"Error has occurred while getting posts"})
        }
    }
}