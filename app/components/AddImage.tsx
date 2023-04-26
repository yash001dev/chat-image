'use client'

import { useState } from "react";
import {useMutation,useQueryClient} from '@tanstack/react-query';
import axios, { AxiosError } from "axios";
import { toast } from "react-hot-toast";

export default function AddImage(){
    const [url,setUrl]=useState('');
    const [isDisabled,setIsDisabled]=useState(false);
    let toastPostID:string;
    
    //Create a post
    // const {mutate}=useMutation(
    //     async (url:string)=>{
    //         await axios.post('/api/image/addImage',{url:url})
    //     },
    //     {
    //         onError:(error)=>{
    //             if(error instanceof AxiosError){
    //                 toast.error(error?.response?.data.message,{id:toastPostID});
    //             }
    //             setIsDisabled(false);
    //         },
    //         onSuccess:(data)=>{
    //             toast.success("Post has been made 🔥",{id:toastPostID})
    //             setUrl('');
    //             setIsDisabled(false);
    //         }
    //     }
    // )
    // const submitPost=async (e:React.FormEvent)=>{
    //     e.preventDefault();
    //     setIsDisabled(true);
    //     toastPostID=toast.loading("Creating your post",{
    //         id:toastPostID
    //     })
    //     await mutate(url);
    //     setIsDisabled(false);
    //     setUrl('');
    // }
    return (
        <form  className="bg-white my-8 p-8 rounded-md">
            <div className="flex flex-col my-4">
                <input type="text" onChange={(e)=>setUrl(e.target.value)} name="url" value={url}
                placeholder="What's on your mind?"
                className="p-4 text-lg rounded-md my-2 bg-gray-200 "
                ></input>
            </div>
            <div className="flex justify-end">
                <button
                    disabled={isDisabled}
                    className="text-sm bg-teal-600 text-white py-2 px-6 rounded-xl disabled:opacity-25"
                    type="submit"
                >Post a Image</button>
            </div>
        </form>
    )
}