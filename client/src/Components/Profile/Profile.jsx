import React, { useState } from 'react'
import { BsArrowLeft, BsCheck2, BsPencil } from 'react-icons/bs'
import { useNavigate } from 'react-router'

export const Profile = ({handleOpenClose}) => {
    const navigate = useNavigate(); 
    const [flag, setFlag] = useState(false);
    const [username, setUsername] = useState(null);

    const handleFlag = () => {
        setFlag(true)
    }

    const handleCheckClick =() => {
        setFlag(false);
    }

    const handleChange = (e) => {
        setUsername(e.target.value);
        console.log(username);
    }

  return (
    <div className='w-full h-full'>
        <div className='items-center space-x-10 bg-[#5a2257] text-white pt-16 px-10 pb-5'>
            <BsArrowLeft className='cursor-pointer text-2xl font-bold' onClick={handleOpenClose}/>
            <p className='cursor-pointer font-semibold'>Profile</p>
        </div>
        <div className='flex flex-col justify-center items-center my-12'>
            <label htmlFor="imgInput">
                <img className='rounded-full w-[15vw] h-[15vw] cursor-pointer' src="https://cdn.pixabay.com/photo/2023/04/28/14/35/dog-7956828_1280.jpg" alt="" />
            </label>
            <input type="file" id='imgInput' className='hidden' />
        </div>
        <div className='bg-white px-3'>
            <p className='py-3'>Your Name</p>

            {!flag && <div className='w-full flex justify-between items-center'>
                <p className='py-3'>{username || "Tri Quang"}</p>
                <BsPencil onClick={handleFlag} className='cursor-pointer'/>
            </div>}
             {
                flag && <div className='w-full flex justify-between items-center py-2'>
                    <input onChange={handleChange} className='w-[80%] outline-none border-b-2 border-blue-700 p-2' type="text" placeholder='Enter you name' />
                    <BsCheck2 onClick={handleCheckClick} className='cursor-pointer text-2xl'/>
                </div>
             }
        </div>
    </div>
  )
}
