import React, { useEffect, useState } from "react";
import { TbCircleDashed } from "react-icons/tb";
import { BiCommentDetail } from "react-icons/bi";
import { ImAttachment } from "react-icons/im";
import { AiOutlineSearch } from "react-icons/ai";
import {
  BsEmojiSmile,
  BsFilter,
  BsMicFill,
  BsThreeDotsVertical,
} from "react-icons/bs";
import { ChatCard } from "./Chat/ChatCard";
import { MessageCard } from "./Message/MessageCard";
import "./HomePage.css";
import { useNavigate } from "react-router";
import { Profile } from "./Profile/Profile";
import { Menu, MenuItem } from "@mui/material";
import { CreateGroup } from "./Group/CreateGroup";
import { useDispatch, useSelector } from "react-redux";
import { currentUser, logoutAction, searchUser } from "../Redux/Auth/Action";
import { createChat, getUserChat } from "../Redux/Chat/Action";
import { createMessage, getAllMessage } from "../Redux/Message/Action";

export const HomePage = () => {
  const [query, setQuery] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);
  const [content, setContent] = useState("");
  const [isProfile, setIsProfile] = useState(false);
  const navigate = useNavigate();
  const [isGroup, setIsGroup] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const { auth, chat, message } = useSelector((store) => store);
  const token = localStorage.getItem("token");

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSearch = (keyword) => {
    dispatch(searchUser({ keyword, token }));
  };
  const handleClickChat = (userId) => {
    dispatch(createChat({ token, data: { userId } }));
    setQuery("")
  };
  const hanldeMessage = () => {
    dispatch(createMessage({token, data:{chatId:currentChat.id, content:content}}))
  };

  const handleNavigate = () => {
    setIsProfile(true);
  };

  const handleOpenClose = () => {
    setIsProfile(false);
  };

  const handleCreateGroup = () => {
    setIsGroup(true);
  };

  const handleLogout = () => {
    dispatch(logoutAction());
    navigate("/signin");
  };

  useEffect(() => {
    if (!auth.reqUser) {
      navigate("/signin");
    }
  }, [auth.reqUser]);

  useEffect(() => {
    dispatch(currentUser(token));
  }, [token]);

  useEffect(() => {
    dispatch(getUserChat({ token }));
  }, [chat.createChat, chat.createGroupChat]);

  const handleCurrentChat = (item) => {
    setCurrentChat(item)
  }

  useEffect(()=> {
    if(currentChat?.id)
    dispatch(getAllMessage({chatId:currentChat.id, token}))
  }, [currentChat, message.newMessage])

  return (
    <div className="relative">
      <div className="w-full py-14 bg-[#6e256e]"></div>
      <div className="flex bg-[#f0f2f5] h-[90vh] absolute left-[2vw] top-[5vh] w-[96vw]">
        <div className="left w-[30%] bg-[#e8e9ec] h-full">
          {isGroup && <CreateGroup setIsGroup={setIsGroup} />}
          {isProfile && (
            <div className="w-full h-full">
              <Profile handleOpenClose={handleOpenClose} />
            </div>
          )}

          {!isProfile && !isGroup && (
            <div className="w-full">
              {
                <div className="flex justify-between items-center p-3">
                  <div
                    onClick={handleNavigate}
                    className="flex items-center space-x-3"
                  >
                    <img
                      className="rounded-full w-10 h-10 cursor-pointer"
                      src={auth.reqUser?.image || "https://cdn.pixabay.com/photo/2016/08/31/11/54/icon-1633249_1280.png"} alt="" />
                    <p className="font-bold">{auth.reqUser?.fullName}</p>
                  </div>
                  <div className="space-x-3 text-2xl flex">
                    <TbCircleDashed
                      className="cursor-pointer"
                      onClick={() => navigate("/status")}
                    />
                    <BiCommentDetail />
                    <div>
                      <BsThreeDotsVertical
                        id="basic-button"
                        aria-controls={open ? "basic-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                        onClick={handleClick}
                      />

                      <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                          "aria-labelledby": "basic-button",
                        }}
                      >
                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                        <MenuItem onClick={handleCreateGroup}>
                          Create Group
                        </MenuItem>
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                      </Menu>
                    </div>
                  </div>
                </div>
              }

              <div className="relative flex justify-center items-center bg-white py-4 px-3">
                <input
                  className="border-none outline-none bg-slate-200 rounded-md w-[93%] pl-9 py-2"
                  type="text"
                  placeholder="Search"
                  onChange={(e) => {
                    setQuery(e.target.value);
                    handleSearch(e.target.value);
                  }}
                  value={query}
                />
                <AiOutlineSearch className="left-5 top-7 absolute" />
                <div>
                  <BsFilter className="ml-4 text-3xl" />
                </div>
              </div>

              <div className="bg-white overflow-y-scroll h-[72vh] px-3">
                {query &&
                  auth.searchUser?.map((item) => (
                    <div onClick={() => handleClickChat(item.id)}>
                      {" "}
                      <hr />
                      <ChatCard
                        name={item.fullName}
                        userImage={
                          item.image ||
                          "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png"
                        }
                      />
                    </div>
                  ))}

                {chat.chats.length > 0 &&
                  !query &&
                  chat.chats?.map((item) => (
                    <div onClick={() => handleCurrentChat(item)}>
                      <hr />
                      {item.group ? (
                        <ChatCard
                          name={item.chatName}
                          userImage={
                            item.chatImage ||
                            "https://cdn.pixabay.com/photo/2017/07/18/23/40/group-2517459_1280.png"
                          }
                        />
                      ) : (
                        <ChatCard
                          isChat={true}
                          name={
                            auth.reqUser?.id !== item.users[0]?.id
                              ? item.users[0].fullName
                              : item.users[1].fullName
                          }
                          userImage={
                            auth.reqUser.id !== item.users[0].id
                              ? item.users[0].image ||
                                "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png"
                              : item.users[1].image ||
                                "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png"
                          }
                        />
                      )}
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>

        {!currentChat && (
          <div className="w-[70%] flex flex-col items-center justify-center h-full">
            <div className="max-w-[70%] text-center">
              <img
                src="https://www.telemessage.com/wp-content/uploads/2022/02/WhatsApp-Multi-Device1-1.jpg"
                alt=""
              />
              <h1 className="text-4xl text-gray-600">
                WhatsApp Multi-device Features
              </h1>
              <p className="my-9">
                The cross-device beta version of WhatsApp started rolling out
                for iOS users, allowing users who were on the stable update
                channel to try out the new features.
              </p>
            </div>
          </div>
        )}
        {currentChat && (
          <div className="w-[70%] relative bg-blue-200">
            <div className="header absolute top-0 w-full bg-[#f0f2f5]">
              <div className="flex justify-between">
                <div className="py-3 space-x-4 flex items-center px-3">
                  <img
                    className="w-10 h-10 rounded-full"
                    src={ currentChat.group? currentChat.chatImage || "https://cdn.pixabay.com/photo/2017/07/18/23/40/group-2517459_1280.png":
                     ( auth.reqUser.id !== currentChat.users[0].id
                              ? currentChat.users[0].image ||
                                "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png"
                              : currentChat.users[1].image ||
                                "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png"
                    )}
                    alt=""
                  />
                  <p>{currentChat.group? currentChat.chatName: (auth.reqUser?.id===currentChat.users[0].id?currentChat.users[1].fullName:currentChat.users[0].fullName)}</p>
                </div>
                <div className="py-3 flex space-x-4 items-center px-3">
                  <AiOutlineSearch />
                  <BsThreeDotsVertical />
                </div>
              </div>
            </div>
            <div className="px-10 h-[85vh] overflow-y-scroll ">
              <div className="space-y-1 flex flex-col justify-center mt-20 py-2">
                {message.messages.length> 0 && message.messages?.map((item, i) => (
                  <MessageCard isReqUserMsg={item.user.id!==auth.reqUser.id} content={item.content} />
                ))}
              </div>
            </div>
            <div className="footer bg-[#f0f2f5] absolute bottom-0 w-full py-3 text-2xl">
              <div className="flex justify-between items-center px-5 relative">
                <BsEmojiSmile className="cursor-pointer" />
                <ImAttachment />
                <input
                  className="py-2 outline-none border-none bg-white pl-4 rounded-md w-[85%]"
                  type="text"
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Type a message"
                  value={content}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      hanldeMessage();
                      setContent("");
                    }
                  }}
                />
                <BsMicFill />
              </div>
              <div></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
