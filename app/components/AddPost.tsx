'use client'

import { title } from "process"
import { forwardRef, useState } from "react";
import {useMutation,useQueryClient} from '@tanstack/react-query';
import axios, { AxiosError } from "axios";
import { toast } from "react-hot-toast";

interface AddPostProps{}

const AddPost=forwardRef<HTMLFormElement,AddPostProps>((props,ref)=>{
    const [title,setTitle]=useState('');
    const [isDisabled,setIsDisabled]=useState(false);
    let toastPostID:string;
    
    //Create a post
    const {mutate}=useMutation(
        async (title:string)=>{
            await axios.post('/api/posts/addPost',{title})
        },
        {
            onError:(error)=>{
                if(error instanceof AxiosError){
                    toast.error(error?.response?.data.message,{id:toastPostID});
                }
                setIsDisabled(false);
            },
            onSuccess:(data)=>{
                toast.success("Post has been made 🔥",{id:toastPostID})
                setTitle('');
                setIsDisabled(false);
            }
        }
    )
    const submitPost=async (e:React.FormEvent)=>{
        e.preventDefault();
        setIsDisabled(true);
        toastPostID=toast.loading("Creating your post",{
            id:toastPostID
        })
        await mutate(title);
        // setIsDisabled(false);
        // setTitle('');
    }
    return (
        <form ref={ref} onSubmit={submitPost} className="bg-white my-8 p-8 rounded-md absolute right-0 top-0">
            <div className="flex flex-col my-4">
                <textarea onChange={(e)=>setTitle(e.target.value)} name="title" value={title}
                placeholder="What's on your mind?"
                className="p-4 text-lg rounded-md my-2 bg-gray-200 "
                ></textarea>
            </div>
            <div className="flex items-center justify-between gap-2">
                <p className={`font-bold text-sm ${title?.length>300?"text-red-700":"text-gray-700"}`}>
                    {title.length}/300
                </p>
                <button
                    disabled={isDisabled}
                    className="text-sm bg-teal-600 text-white py-2 px-6 rounded-xl disabled:opacity-25"
                    type="submit"
                >Post a comment</button>
            </div>
        </form>
    )
})

AddPost.displayName="AddPost";

export default AddPost;