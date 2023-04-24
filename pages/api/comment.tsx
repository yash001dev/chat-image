import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import prisma from '../../prisma/client'
import { Server } from "socket.io";

let io:Server;

export function setSocketInstance(socket:Server){
    io=socket;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
){
    if(req.method === "POST"){
        const session=await getServerSession(req,res,authOptions);
        if(!session) return res.status(401).json({message:"Please sign in to add a post"});


        //Get User
        const prismaUser=await prisma.user.findUnique({
            where:{email:session?.user?.email}
        });

        const {text,imageId}=req.body;
        const userId=prismaUser.id;
        const comment=await prisma.comment.create({
            data:{
                text,
                user:{
                    connect:{
                        id:userId
                    }
                },
                image:{
                    connect:{
                        id:imageId
                    }
                }
            },
            include:{
                user:true,
                image:{
                    include:{
                        user:true
                    }
                }
            }
        });
        io.emit(`image:${imageId}:comment`,comment);
        res.status(200).json(comment);
    }
    if(req.method === "GET"){
       const comments=await prisma.comment.findMany({
            where:{
                imageId:req.query.imageId,
                userId:req.query.userId
            }
       })
       res.status(200).json(comments);
    }
    if(req.method === "PUT"){
        const {id,text}=req.body;
        const comment=await prisma.comment.update({
            where:{
                id
            },
            data:{
                text
            }
        })
        res.status(200).json(comment);
    }
    if(req.method === "DELETE"){
        const {id}=req.body;
        const comment=await prisma.comment.delete({
            where:{
                id
            }
        })
        res.status(200).json(comment);
    }
}
