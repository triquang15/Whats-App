import React, { useState } from 'react'
import { BsArrowLeft, BsCheck2, BsPencil } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../Redux/Auth/Action';

export const Profile = ({handleOpenClose}) => {
    const [flag, setFlag] = useState(false);
    const [username, setUsername] = useState(null);
    const [tempPicture, setTempPicture] = useState(null);
    const {auth} = useSelector(store => store);
    const dispatch = useDispatch();

    const handleFlag = () => {
        setFlag(true)
    }

    const handleCheckClick =() => {
        setFlag(false);
        const data = {
            id: auth.reqUser?.id,
            token: localStorage.getItem("token"),
            data: {fullName: username},
        };
      
            dispatch(updateUser(data))
        
    }

    const handleChange = (e) => {
        setUsername(e.target.value);
        console.log(username);
    }

    const uploadToCloudinary =(pics) => {
        const data = new FormData();
        data.append("file", pics);
        data.append("upload_preset", "whatsapp");
        data.append("cloud_name", "dz0dg0cxp");
        fetch("https://api.cloudinary.com/v1_1/dz0dg0cxp/image/upload", {
            method: "POST",
            body: data,
        }) 
        .then((res) => res.json())
        .then((data) => {
            setTempPicture(data.url.toString());
        //    setMessage("Image updated successfully")
         //   setOpen(true);
            console.log("imgUrl: ", data.url.toString());
            const getData = {
                id: auth.reqUser.id,
                token: localStorage.getItem("token"),
                data: {image: data.url.toString()},
            };
            dispatch(updateUser(getData));
        });
    }

    const handleUpdateName = (e)=> {
        const data = {
            id: auth.reqUser?.id,
            token: localStorage.getItem("token"),
            data: {fullName: username},
        };
        if(e.target.key === "Enter") {
            dispatch(updateUser(data))
        }
    }

  return (
    <div className='w-full h-full'>
        <div className='items-center space-x-10 bg-[#5a2257] text-white pt-16 px-10 pb-5'>
            <BsArrowLeft className='cursor-pointer text-2xl font-bold' onClick={handleOpenClose}/>
            <p className='cursor-pointer font-semibold'>Profile</p>
        </div>
        <div className='flex flex-col justify-center items-center my-12'>
            <label htmlFor="imgInput">
                <img className='rounded-full w-[15vw] h-[15vw] cursor-pointer' 
                src={auth.reqUser?.image || tempPicture || "https://cdn.pixabay.com/photo/2016/08/31/11/54/icon-1633249_1280.png"} alt="" />
            </label>
            <input onChange={(e) => uploadToCloudinary(e.target.files[0])} type="file" id='imgInput' className='hidden' />
        </div>
        <div className='bg-white px-3'>
            <p className='py-3'>Your Name</p>

            {!flag && <div className='w-full flex justify-between items-center'>
                <p className='py-3'>{auth.reqUser.fullName || "Full Name"}</p>
                <BsPencil onClick={handleFlag} className='cursor-pointer'/>
            </div>}
             {
                flag && <div className='w-full flex justify-between items-center py-2'>
                    <input onKeyPress={handleUpdateName} onChange={handleChange} className='w-[80%] outline-none border-b-2 border-blue-700 p-2' type="text" placeholder='Enter you name' />
                    <BsCheck2 onClick={handleCheckClick} className='cursor-pointer text-2xl'/>
                </div>
             }
        </div>
    </div>
  )
}
