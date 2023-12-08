import React, { useState } from "react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { Member } from "./Member";
import { ChatCard } from "../Chat/ChatCard";
import { NewGroup } from "./NewGroup";
import { useDispatch, useSelector } from "react-redux";
import { searchUser } from "../../Redux/Auth/Action";
import { createGroupChat } from "../../Redux/Chat/Action";

export const CreateGroup = ({setIsGroup}) => {
  const [newGroup, setNewGroup] = useState();
  const [groupMember, setGroupMember] = useState(new Set());
  const [keyword, setKeyword] = useState("");
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);


  const hanldeRemoveMember = (item) => {
    groupMember.delete(item);
    setGroupMember(groupMember);
  };

  const handleSearch = () => {
    dispatch(searchUser({ keyword:keyword, token }));
  };

  return (
    <div className="w-full h-full">
      {!newGroup && (
        <div>
          <div className="flex items-center space-x-10 bg-[#5a2257] text-white pt-16 px-10 pb-5">
            <BsArrowLeft className="cursor-pointer text-2xl font-bold" />
            <p className="text-xl font-semibold">Add Group</p>
          </div>
          <div className="relative bg-white py-4 px-3">
            <div className="flex space-x-2 flex-wrap space-y-1">
              {groupMember.size > 0 &&
                Array.from(groupMember).map((item) => (
                  <Member
                    hanldeRemoveMember={() => hanldeRemoveMember(item)}
                    member={item}
                  />
                ))}
            </div>
            <input
              className="outline-none border-b border-[#8888] p-2 w-[93%]"
              placeholder="Search"
              type="text" value={keyword}
              onChange={(e) => {
                handleSearch(e.target.value)
                setKeyword(e.target.value)
              }}            
            />
          </div>
          <div className="bg-white overflow-y-scroll h-[50.2vh]">
              {keyword && auth.searchUser?.map((item) =>
              <div onClick={() => {
                groupMember.add(item)
                setGroupMember(groupMember)
                setKeyword("")
              }} key={item?.id}>
                <hr />
                <ChatCard userImage={item.image} name={item.fullName}/>
              </div>)}
          </div>
          <div className="bottom-10 py-10 bg-slate-200 flex items-center justify-center">
              <div className="bg-green-600 rounded-full p-4 cursor-pointer" onClick={() => {
                setNewGroup(true)
              }}>
                <BsArrowRight className="text-white font-bold text-3xl"/>
              </div>
          </div>
        </div>
      )}
      {newGroup && <NewGroup setIsGroup={setIsGroup} groupMember={groupMember}/>}
    </div>
  );
};
