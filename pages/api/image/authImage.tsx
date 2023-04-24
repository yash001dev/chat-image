import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import prisma from '../../../prisma/client'
import { NextApiRequest, NextApiResponse } from "next";


export default async function handler(req:NextApiRequest,res:NextApiResponse){
    if(req.method==="GET"){
        const session=await getServerSession(req,res,authOptions);
        if(!session) return res.status(401).json({message:"Please sign in"});
       

        //Get Auth Users Image
        try{
            console.log("GETT DATA:::")
            // const data=await prisma.user.findUnique({
            //     where:{email:session?.user?.email},
            //     include:{
            //         Image:{
            //             orderBy:{
            //                 createdAt:"desc"
            //             },
            //             // include:{
            //             //     comment:true
            //             // }
            //         }
            //     }
            // })
            const data=await prisma.user.findUnique({
                where:{email:session?.user?.email},
                include:{
                    images:true
                }
            })
            console.log("DATA::",data)
            res.status(200).json(data)
        }catch(err){
            res.status(403).json({err:"Error has occurred while creating a image"})
        }
    }
}