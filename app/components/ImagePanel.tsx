
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Post from "./Post";
import { useRouter } from "next/router";
import '../../app/globals.css'
import { useEffect } from "react";



const getImageDetails=async(id:number)=>{
    console.log("API NUMBER:",id)
    const response=await axios.get("/api/image/getImage",{
        params:{
            imageId:id
        }
    });
    console.log("RESPONSE:",response);
    return response.data;
};


const ImagePanel = () => {
    const router=useRouter();
    const routingData=useRouter().query?.imageId;
    
   


    const {data,error,isLoading}=useQuery({
        queryFn:()=>getImageDetails(routingData),
        queryKey:["imagePanel"],
        enabled:!!routingData
    });

    if(isLoading){
        return <div>Loading...</div>
    }
    if(error){
        return <div>Error</div>
    }

    console.log("DATA:",data)
  
  return <Post key={data[0]?.id} avatarName={data[0]?.user?.name} imageId={data[0]?.id} imageUrl={data[0]?.url} avatar={data[0]?.user?.image}  />
  
};

export default ImagePanel;