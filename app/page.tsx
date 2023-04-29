'use client';
import React from "react";

import axios from "axios";
import AddImage from "./components/AddImage";
import AddPost from "./components/AddPost";
import { useQuery } from "@tanstack/react-query";
import Post from "./components/Post";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getSession } from "next-auth/react";
import Gallery from "./components/Gallary";

const socket=io("http://localhost:3001")

//Fetch all posts
const allImage=async()=>{
    const response=await axios.get("/api/image/authImage");
    return response.data;
};

interface CommentParams{
    body:string;
    imageId:number;
}

export default function Home() {
    

    const userData=useSelector((state:any)=>state.user);
    const [userPrivateInfo,setUserPrivateInfo]=useState<Object>({});

    useEffect(()=>{
        async function getUserData(){
            const session= await getSession()
            setUserPrivateInfo(session?.user??{});
        }
        getUserData();
    },[]);

    const {data,error,isLoading}=useQuery({
        queryFn:allImage,
        queryKey:["authImage"],
        
    });

    if(error) return <div>Error</div>;
    if(isLoading) return <div>Loading...</div>;
    return(
        <div>

            <AddImage/>

            <Gallery data={data?.images}/>
        </div>
    );
}