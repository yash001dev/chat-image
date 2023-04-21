import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import prisma from '../../../prisma/client'
import { NextApiRequest, NextApiResponse } from "next";


export default async function handler(req:NextApiRequest,res:NextApiResponse){
    if(req.method==="POST"){
        const session=await getServerSession(req,res,authOptions);
        if(!session) return res.status(401).json({message:"Please sign in to add a image"});
        const {url,description=url}=req.body;

        //Get User 
        const prismaUser=await prisma.user.findUnique({
            where:{email:session?.user?.email}
        });

        //Check Url is Valid
        if(!url) return res.status(403).json({message:"Please provide a valid url"});
        
        //Check Url with regex
        const regex=/^https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg|webp)$/i;
        if(!regex.test(url)) return res.status(403).json({message:"Please provide a valid url"});

        //Create a image
        try{
            const result=await prisma.image.create({
                data:{
                    url,
                    description,
                    userId:prismaUser.id
                }
            })
            res.status(200).json(result)
        }catch(err){
            res.status(403).json({err:"Error has occurred while creating a image"})
        }
    }
}