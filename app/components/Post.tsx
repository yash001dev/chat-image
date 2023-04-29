'use client'
import Image from 'next/image'
import Link from 'next/link'
import ImageAnnotationApp from './ImageAnnotation';
import { BsCommand } from 'react-icons/bs';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { toogleCommentMode } from '../store/userReducer';

interface PostProps{
    avatarName:string;
    imageId:number;
    imageUrl:string;
    avatar:string;
}

export default function Post({avatarName,imageId,imageUrl,avatar}:PostProps){
    const {commentMode}=useSelector((state:any)=>state.user);
    const dispatch=useDispatch();
    return(
        <div className='mx-4 md:mx-48 xl:mx-96 bg-gray-200 my-8 p-8 rounded-lg flex flex-col'>
            <div className='flex items-center justify-between'>
            <div className='flex items-center'>
            <Image
                className='rounded-full'
                width={38}
                height={38}
                src={avatar}
                alt='avatar'
                />
                <h3 className='font-bold text-gray-700 mx-2'>{avatarName}</h3>
            </div>
            <div>
                <BsCommand onClick={()=>dispatch(toogleCommentMode())} className={clsx(
                    'cursor-pointer text-2xl',
                    {
                        ' text-teal-700 ':commentMode,
                    }
                )}/>
            </div>
            </div>
            
            <div className='my-8'>
              
                <ImageAnnotationApp imageId={imageId} commentMode={commentMode} url={imageUrl} />
                
            </div>
           
        </div>
    )
}