import React from 'react'

export const ChatCard = () => {
    return (
        <div className='flex items-center justify-between py-2 group cursor-pointer'>
            <div className='w-[20%]'>
                <img className='h-14 w-14 rounded-full' src="https://cdn.pixabay.com/photo/2023/11/27/21/15/bird-8416208_1280.jpg" alt="" />
            </div>
            <div className='pl-5 w-[80%]'>
                <div className='flex justify-between items-center'>
                    <p className='text-lg'>Leo Messi</p>
                    <p className='text-sm'>04-12-2023</p>
                </div>
                <div className='flex justify-between items-center'>
                    <p>Helllo World !</p>
                    <div className='flex space-x-2 items-center'>
                        <p className='text-xs p-1 px-2 text-white bg-green-500 rounded-full'>5</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
