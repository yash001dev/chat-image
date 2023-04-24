'use client'

import { useQuery } from '@tanstack/react-query'
import axios from "axios";
import Image from 'next/image';

const fetchAuthImage = async () => {
    const { data } = await axios.get('/api/image/authImage')
    return data
}

export default function MyImage() {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['authImage'],
        queryFn: fetchAuthImage,
    })
    if (isLoading) return <p>Loading...</p>
    if (isError) return <p>Error</p>
    console.log(data)
    return (
        <div>
            <div className='bg-white my-8 p-8 rounded-lg'>
            <div className='flex items-center gap-2'>
                {/* <Image
                className='rounded-full'
                width={32}
                height={32}
                src={avatar}
                alt='avatar'
                /> */}
                <h3 className='font-bold text-gray-700'>{name}</h3>
            </div>
            <div className='my-8'>
                <p className='break-all'>{postTitle}</p>
            </div>
            <div className='flex gap-4 cursor-pointer items-center'>
                {/* <Link href={`/post/${id}`}>
                    <p className="text-sm font-bold text-gray-700">
                        {comments?.length ?? 0} Comments
                    </p>
                </Link> */}
            </div>
        </div>
        </div>
    )
}