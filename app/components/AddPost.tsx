'use client'

import { title } from "process"
import { forwardRef, useState } from "react";
import {useMutation,useQueryClient} from '@tanstack/react-query';
import axios, { AxiosError } from "axios";
import { BsFillTrash3Fill, BsGenderFemale } from "react-icons/bs";

interface AddPostProps{
    readMode?:boolean;
    writeMode?:boolean;
    createMode?:boolean;
    comment?:string;
    imageId?:number;
    author?:Object;
    createComment?:Function;
}

const AddPost=forwardRef<HTMLFormElement,AddPostProps>(({readMode=false,writeMode=false,createMode=false,comment,imageId,author,createComment=()=>{}},ref)=>{
    const [title,setTitle]=useState('');
    const [isDisabled,setIsDisabled]=useState(false);
    let toastPostID:string;
    const [editComment,setEditComment]=useState<string>(comment??'');
    
    //Create a post
    // const {mutate}=useMutation(
    //     async (title:string)=>{
    //         await axios.post('/api/posts/addPost',{title})
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
    //             setTitle('');
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
    //     await mutate(title);
    //     // setIsDisabled(false);
    //     // setTitle('');
    // }
    return (
        <form ref={ref}  className="bg-white my-2 p-4 rounded-md right-0 top-0">
            <div className="flex flex-col my-4">
                <div className="flex justify-between">Add a Comment{writeMode && <BsFillTrash3Fill className="text-red-500"/>}</div>
                <input value={editComment} onChange={(e)=>setEditComment(e.target.value)} disabled={readMode} type="text" name="title" 
                placeholder="What's on your mind?"
                
                className="p-2 text-lg rounded-md my-2 bg-gray-200 outline-black focus-within:outline-teal-600"
                ></input>
            </div>
            <div className="flex items-center justify-between gap-2">
                <p className={`font-bold text-sm ${title?.length>300?"text-red-700":"text-gray-700"}`}>
                    {title.length}/300
                </p>
                {createMode && <button
                    onClick={(e)=>createComment(e,{
                        body:editComment,
                        imageId:imageId,
                        author:author
                    })}
                    disabled={isDisabled}
                    className="text-sm bg-teal-600 text-white py-2 px-6 rounded-xl disabled:opacity-25"
                    type="submit"
                >Post a comment</button>}
            </div>
        </form>
    )
})

AddPost.displayName="AddPost";

export default AddPost;