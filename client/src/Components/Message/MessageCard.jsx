import React from 'react'

export const MessageCard = ({isReqUserMsg, content}) => {
  return (
    <div className={`py-2 px-2 rounded-md max-w-[50%] ${isReqUserMsg? "self-start bg-white" : "self-end bg-[#d9fdd3]"}`}>
        <p>{content}</p>
    </div>
  )
}
