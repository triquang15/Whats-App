import React from 'react'
import { useNavigate } from 'react-router'

export const StatusCard = () => {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate(`/status/{userId}`)
    }

  return (
    <div onClick={handleNavigate} className='flex items-center p-3 cursor-pointer'>
        <div>
            <img className='h-7 w-7 lg:w-10 lg:h-10 rounded-full' src="https://cdn.pixabay.com/photo/2023/07/15/08/43/labrador-8128379_1280.jpg" alt="" />
        </div>
        <div className='ml-2 text-white'>
            <p>Leo Messi</p>
        </div>
    </div>
  )
}
