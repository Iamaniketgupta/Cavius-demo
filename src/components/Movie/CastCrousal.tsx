import Image from 'next/image';
import React from 'react'
import { IoIosArrowRoundBack } from "react-icons/io";
import { IoIosArrowRoundForward } from "react-icons/io";

export default function CastCrousal({ cast }) {
    return (
        <div className="">
            <div className='flex items-center justify-between'>
                <h3 className="text-gray60">Cast</h3>

             {cast && cast?.length>0  && <div className='flex items-center gap-2'>
                    <button className='p-1.5 text-2xl hover:bg-black15 rounded-full bg-black03 
                    border-[1px]
                     border-black15 flex items-center justify-center' >
                        <IoIosArrowRoundBack />
                    </button>
                    <button className='p-1.5 text-2xl rounded-full hover:bg-black15 bg-black03 
                    border-[1px]
                     border-black15 flex items-center justify-center' >
                        <IoIosArrowRoundForward />
                    </button>
                </div>}
            </div>

            <div className='flex items-center gap-4'>
                { !cast || cast?.length === 0 ? <p className='text-center text-xs text-gray75 w-full'>No Cast Available </p>:
                    cast?.map((item) =>
                        <Image key={item} width={50} height={50}
                            src="https://images.unsplash.com/photo-1630763882488-73a2d2267c0d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt="img" className='rounded-lg overflow-clip bg-cover' />
                    )
                }
            </div>

        </div>
    )
}
