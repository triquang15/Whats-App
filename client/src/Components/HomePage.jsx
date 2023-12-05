import React, { useState } from 'react'
import { TbCircleDashed } from 'react-icons/tb'
import { BiCommentDetail } from 'react-icons/bi'
import { ImAttachment } from 'react-icons/im'
import { AiOutlineSearch } from 'react-icons/ai'
import { BsEmojiSmile, BsFilter, BsMicFill, BsThreeDotsVertical } from 'react-icons/bs'
import { ChatCard } from './Chat/ChatCard'
import { MessageCard } from './Message/MessageCard'
import "./HomePage.css"
import { useNavigate } from 'react-router'
import { Profile } from './Profile/Profile'

export const HomePage = () => {
    const [query, setQuery] = useState(null);
    const [currentChat, setCurrentChat] = useState(null);
    const [content, setContent] = useState("");
    const [isProfile, setIsProfile] = useState(false);
    const navigate = useNavigate();

    const handleSearch = () => []
    const handleClickChat = () => [
        setCurrentChat(true)
    ]

    const hanldeMessage = () => { }

    const handleNavigate = () => {
        setIsProfile(true);
    }

    const handleOpenClose = () => {
        setIsProfile(false);
    }

    return (
        <div className='relative'>
            <div className='w-full py-14 bg-[#6e256e]'></div>
            <div className='flex bg-[#f0f2f5] h-[90vh] absolute left-[2vw] top-[5vh] w-[96vw]'>
                <div className='left w-[30%] bg-[#e8e9ec] h-full'>
                    {isProfile && <div className='w-full h-full'><Profile handleOpenClose={handleOpenClose} /></div>}

                  {!isProfile && <div className='w-full'>
                        { <div className='flex justify-between items-center p-3'>
                            <div onClick={handleNavigate} className='flex items-center space-x-3'>
                                <img className='rounded-full w-10 h-10 cursor-pointer' src="https://cdn.pixabay.com/photo/2023/10/01/12/56/shih-tzu-8287355_1280.jpg" alt="" />
                                <p>Tri Quang</p>
                            </div>
                            <div className='space-x-3 text-2xl flex'>
                                <TbCircleDashed className='cursor-pointer' onClick={() => navigate("/status")}/>
                                <BiCommentDetail />
                            </div>
                        </div>}

                        <div className='relative flex justify-center items-center bg-white py-4 px-3'>
                            <input className='border-none outline-none bg-slate-200 rounded-md w-[93%] pl-9 py-2' type="text"
                                placeholder='Search' onChange={(e) => {
                                    setQuery(e.target.value)
                                    handleSearch(e.target.value)
                                }} value={query} />
                            <AiOutlineSearch className='left-5 top-7 absolute' />
                            <div>
                                <BsFilter className='ml-4 text-3xl' />
                            </div>
                        </div>

                        <div className='bg-white overflow-y-scroll h-[72vh] px-3'>
                            {query && [1, 1, 1, 1, 1].map((item) => (
                                <div onClick={handleClickChat}>
                                    {" "}
                                    <hr /><ChatCard />{" "}</div>))}
                        </div>                      
                    </div>}

                </div>

                {!currentChat && (
                    <div className='w-[70%] flex flex-col items-center justify-center h-full'>
                        <div className='max-w-[70%] text-center'>
                            <img src="https://www.telemessage.com/wp-content/uploads/2022/02/WhatsApp-Multi-Device1-1.jpg" alt="" />
                            <h1 className='text-4xl text-gray-600'>WhatsApp Multi-device Features</h1>
                            <p className='my-9'>The cross-device beta version of WhatsApp started rolling out for iOS users, allowing users who were on the stable update channel to try out the new features.</p>
                        </div>
                    </div>)}
                {currentChat && (
                    <div className='w-[70%] relative bg-blue-200'>
                        <div className='header absolute top-0 w-full bg-[#f0f2f5]'>
                            <div className='flex justify-between'>
                                <div className='py-3 space-x-4 flex items-center px-3'>
                                    <img className='w-10 h-10 rounded-full' src="https://cdn.pixabay.com/photo/2023/05/21/17/16/bird-8008902_1280.jpg" alt="" />
                                    <p>Ronaldo</p>
                                </div>
                                <div className='py-3 flex space-x-4 items-center px-3'>
                                    <AiOutlineSearch />
                                    <BsThreeDotsVertical />
                                </div>
                            </div>
                        </div>
                        <div className='px-10 h-[85vh] overflow-y-scroll '>
                            <div className='space-x-1 flex flex-col justify-center mt-20 py-2'>
                                {[1, 1, 1, 1, 1].map((item, i) => (<MessageCard isReqUserMsg={i % 2 === 0} content={"message"} />))}
                            </div>
                        </div>
                        <div className='footer bg-[#f0f2f5] absolute bottom-0 w-full py-3 text-2xl'>
                            <div className='flex justify-between items-center px-5 relative'>

                                <BsEmojiSmile className='cursor-pointer' />
                                <ImAttachment />
                                <input className='py-2 outline-none border-none bg-white pl-4 rounded-md w-[85%]' type="text" onChange={(e) => setContent(e.target.value)}
                                    placeholder='Type a message' value={content} onKeyPress={(e) => {
                                        if (e.key === "Enter") {
                                            hanldeMessage();
                                            setContent("")
                                        }
                                    }} />
                                <BsMicFill />
                            </div>
                            <div>
                        </div>
                        </div>
                    </div>)}
            </div>
        </div>
    )
}
