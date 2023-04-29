'use client'

import { title } from "process"
import { forwardRef, useEffect, useState } from "react";
import {useMutation,useQueryClient} from '@tanstack/react-query';
import axios, { AxiosError } from "axios";
import { BsFillTrash3Fill, BsGenderFemale } from "react-icons/bs";
import UserDropdown from "./UserDropdown";
import { User } from "../utils/userType";

interface AddPostProps{
    readMode?:boolean;
    writeMode?:boolean;
    createMode?:boolean;
    comment?:string;
    imageId?:number;
    author?:Object;
    createComment?:Function; 
    editCommentFunc?:Function;
    deleteComment?:Function;
    markPosition?:{x:number,y:number};
    commentId?:number;
}

const AddPost=forwardRef<HTMLFormElement,AddPostProps>(({readMode=false,writeMode=false,createMode=false,comment,imageId,author,createComment=()=>{},deleteComment=()=>{},markPosition,commentId},ref)=>{
    const [title,setTitle]=useState('');
    const [isDisabled,setIsDisabled]=useState(false);
    let toastPostID:string;
    const [editComment,setEditComment]=useState<string>(comment??'');

    useEffect(()=>{
        if(comment){
            setEditComment(comment);
        }
    },[comment])

    const handleClick=(e:MouseEvent)=>{
        e.preventDefault();
        if(createMode){
            createComment(e,{
                body:editComment,
                imageId:imageId,
                author:author,
                x:markPosition?.x,
                y:markPosition?.y,
            })
        }
        else{
            console.log("COMMENT ID:",commentId)
            createComment(e,{
                body:editComment,
                imageId:imageId,
                commentId:commentId,
            })
        }
    }

    const handleDelete=(e:MouseEvent)=>{
        e.preventDefault();
        deleteComment(e,{
            commentId:commentId,
            imageId:imageId
        })
    }

    const users: User[] = [
        {
            id: 1,
            name: 'Alice',
            email: 'alice@example.com',
            avatarUrl: 'https://i.pravatar.cc/150?u=a1',
        },
        {
            id: 2,
            name: 'Bob',
            email: 'bob@example.com',
            avatarUrl: 'https://i.pravatar.cc/150?u=b2',
        },
        {
            id: 3,
            name: 'Charlie',
            email: 'charlie@example.com',
            avatarUrl: 'https://i.pravatar.cc/150?u=c3',
        },
    ];

    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

    const toggleDropdown = (e) => {
        e.preventDefault();
        setIsDropdownOpen((prevState) => !prevState);
    };
    
    return (
        <form ref={ref}  className="bg-white my-2 p-4 rounded-md right-0 top-0">
            <div className="flex flex-col my-4">
                <div className="flex justify-between">{writeMode?"Edit a Comment":"Add a Comment"}{writeMode && <BsFillTrash3Fill   onClick={(e)=>handleDelete(e)} className="text-red-500 cursor-pointer"/>}</div>
                <input value={editComment} onChange={(e)=>setEditComment(e.target.value)} disabled={readMode} type="text" name="title" 
                placeholder="What's on your mind?"
                
                className="p-2 text-lg rounded-md my-2 bg-gray-200 outline-black focus-within:outline-teal-600"
                ></input>
            </div>
            <div className="flex items-center justify-between gap-2">
                <p className={`font-bold text-sm ${title?.length>300?"text-red-700":"text-gray-700"}`}>
                    {comment?.length?? 0}/300
                </p>
                {/* Plain Button for opening user Dropdown */}
                <div>
                    {!isDropdownOpen &&  <button onClick={toggleDropdown}>@Mention</button>}
                    {isDropdownOpen && (
                        <UserDropdown
                        users={users}
                        isOpen={isDropdownOpen} 
                        onCloseDropdown={() => setIsDropdownOpen(false)}
                        />
                    )}
                </div>
                <button
                    onClick={(e)=>handleClick(e)}
                    disabled={isDisabled}
                    className="text-sm bg-teal-600 text-white py-2 px-6 rounded-xl disabled:opacity-25"
                    type="submit"
                >{writeMode?"Edit a comment":"Post a comment"}</button>
            </div>
        </form>
    )
})

AddPost.displayName="AddPost";

export default AddPost;