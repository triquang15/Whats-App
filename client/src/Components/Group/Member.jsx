import React from "react";
import { AiOutlineClose } from "react-icons/ai";

export const Member = ({ hanldeRemoveMember, member }) => {
  return (
    <div className="flex items-center bg-slate-300 rounded-full">
      <img
        className="w-7 h-7 rounded-full"
        src={member.image}
        alt=""
      />
      <p className="px-2">{member.fullName}</p>
      <AiOutlineClose
        onClick={hanldeRemoveMember}
        className="pr-1 cursor-pointer"
      />
    </div>
  );
};
