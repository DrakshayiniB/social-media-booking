import React, { useEffect, useState } from 'react'
import "./conversation.css"
import axios from 'axios';

export default function Conversation({conversation,currentUser}) {
  const PF ="http://localhost:8800/images/";
  const [user, setUser]= useState(null);

  useEffect(()=>{
    const friendId = conversation.members.find((m)=> m !== currentUser._id);
    const getUser = async () => {
      try {
        const res = await axios.get("http://localhost:8800/api/users?userId=" +friendId)
       setUser(res.data);
        } catch (err) {
          console.log(err)
          }
          }
          getUser();
          },[currentUser, conversation]);

  return (
    <div className=' conversation'>
        <img  className='conversationImg' src={user?.profilePicture ? PF+ user.profilePicture : PF+ "person/noAvatar.png"} alt="" />
        <span className='conversationName'>{user?.username}</span>
      
    </div>
  )
}
