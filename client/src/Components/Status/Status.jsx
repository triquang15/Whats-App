import React from 'react'
import { StatusCard } from './StatusCard'
import { AiOutlineClose } from 'react-icons/ai'
import { useNavigate } from 'react-router'

export const Status = () => {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate(-1);
    }

  return (
    <div className=''>
        <div className='flex items-center px-[14vw] py-[7vh]'>
            <div className='left h-[85vh] bg-[#464343] lg:w-[25%] w-[50%] px-5'>
                <div className='pt-5 h-[17%]'>
                    <StatusCard/>
                </div>
                <hr />
                <div className='overflow-y-scroll h-[75%] pt-2'>
                    {[1,1,1,1,1,1,1,1,1,1,1,1].map((item) => <StatusCard/>)}
                </div>
            </div>
            <div className='relative h-[85vh] lg:w-[70%] w-[50%] bg-[#231f1f]'>
                <AiOutlineClose onClick={handleNavigate} className='text-white cursor-pointer absolute top-5 right-10 text-xl'/>
            </div>
        </div>
    </div>
  )
}
