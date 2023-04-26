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
    avatar:string;
    name:string;
    postTitle:string;
    id:string;
    comments:string[];
    childrenDetails:any;
    createComment:()=>void;
}

export default function Post({avatar,name,postTitle,id,comments,createComment}:PostProps){
    const userData=useSelector((state:any)=>state.user);
    const dispatch=useDispatch();
    return(
        <div className='bg-white my-8 p-8 rounded-lg flex flex-col'>
            <div className='flex items-center justify-between'>
            <div className='flex items-center'>
            <Image
                className='rounded-full'
                width={38}
                height={38}
                src={avatar}
                alt='avatar'
                />
                <h3 className='font-bold text-gray-700 mx-2'>{"anyy"}</h3>
            </div>
            <div>
                <BsCommand onClick={()=>dispatch(toogleCommentMode())} className={clsx(
                    'cursor-pointer text-2xl',
                    {
                        ' text-teal-700 ':userData?.commentMode,
                    }
                )}/>
            </div>
            </div>
            
            <div className='my-8'>
                {/* <Image width={500} height={400} className='h-full w-full object-cover' src={"https://cdn.pixabay.com/photo/2016/11/19/18/06/feet-1840619_960_720.jpg"} alt="ANy" /> */}
                <ImageAnnotationApp commentMode={true} url="https://cdn.pixabay.com/photo/2016/11/19/18/06/feet-1840619_960_720.jpg" />
                <p className='break-all'>{"any"}</p>
            </div>
            <div className='flex gap-4 cursor-pointer items-center'>
                <Link href={`/post/${id}`}>
                    <p className="text-sm font-bold text-gray-700">
                        {comments?.length ?? 0} Comments
                    </p>
                </Link>
            </div>
        </div>
    )
}