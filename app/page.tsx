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
    const {data,error,isLoading}=useQuery({
        queryFn:allImage,
        queryKey:["authImage"]
    });

    const userData=useSelector((state:any)=>state.user);
    console.log("userData:",userData);
    const [userPrivateInfo,setUserPrivateInfo]=useState<Object>({});

    useEffect(()=>{
        async function getUserData(){
            const session= await getSession()
            setUserPrivateInfo(session?.user??{});
        }
        getUserData();
    },[]);
    console.log("userPrivateInfo:",userPrivateInfo);
    // useEffect(()=>{
    //     socket.on("connect",()=>{
    //         console.log("Connected");
    //     });
    //     socket.on("disconnect",()=>{
    //         console.log("Disconnected");
    //     });
    // },[]);

    useEffect(()=>{
        socket.on("receiveComment",(comment)=>{
            console.log("comment:",comment);
        });
    },[])

    const createComment=async({body,imageId}:CommentParams)=>{
        socket.emit("sendComment",{body:"hey guy",imageId:"1",author:userPrivateInfo});
    };

    const editComment=async()=>{
        socket.emit("editComment",{text:"Hello",imageId:"123"});
    }
    

    if(error) return <div>Error</div>;
    if(isLoading) return <div>Loading...</div>;
    console.log("data:",data);
    return(
        <div>
            {/* <h1>Hello next</h1> */}
            <AddImage/>
            <button onClick={createComment}>Create Comment</button>
             <Post name={data?.image} postTitle="anything" avatar={data?.image} id={data?.id} />
            {/* {data.map((post:any)=>{
                return <Post postTitle={post?.title} key={post.id} name={post.user.name} avatar={post.user.image} id="123" 
                comments={post?.comments} />
            })} */}
            {/* <button onClick={createComment}>Create Comment</button>
            <Post comments={} name={data?.image} postTitle="anything" avatar={data?.image} id={data?.id} /> */}
            {/* <AddImage/> */}
        </div>
    );
}