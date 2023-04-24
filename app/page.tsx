'use client';

import axios from "axios";
import AddImage from "./components/AddImage";
import AddPost from "./components/AddPost";
import { useQuery } from "@tanstack/react-query";
import Post from "./components/Post";

//Fetch all posts
const allImage=async()=>{
    const response=await axios.get("/api/image/authImage");
    return response.data;
};

export default function Home() {
    const {data,error,isLoading}=useQuery({
        queryFn:allImage,
        queryKey:["authImage"]
    });
    if(error) return <div>Error</div>
    if(isLoading) return <div>Loading...</div>
    console.log("data:",data);
    return(
        <div>
            {/* <h1>Hello next</h1> */}
            <AddPost/>
            {/* {data.map((post:any)=>{
                return <Post postTitle={post?.title} key={post.id} name={post.user.name} avatar={post.user.image} id="123" 
                comments={post?.comments} />
            })} */}
            <Post comments={[]} name={data?.image} postTitle="anything" avatar={data?.image} id={data?.id} />
            {/* <AddImage/> */}
        </div>
    )
}