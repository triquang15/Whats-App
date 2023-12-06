import React from "react";
import { AiOutlineClose } from "react-icons/ai";

export const Member = ({ hanldeRemoveMember, member }) => {
  return (
    <div className="flex items-center bg-slate-300 rounded-full">
      <img
        className="w-7 h-7 rounded-full"
        src="https://cdn.pixabay.com/photo/2023/09/28/07/18/oak-tree-8280839_1280.jpg"
        alt=""
      />
      <p className="px-2">Miss Nana</p>
      <AiOutlineClose
        onClick={hanldeRemoveMember}
        className="pr-1 cursor-pointer"
      />
    </div>
  );
};
