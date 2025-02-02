import React, { useEffect, useState } from 'react';
import "./chattOnline.css";
import axios from 'axios';

export default function ChattOnline({ onlineUsers, currentId, setCurrentChat }) {
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);
  const PF = "http://localhost:8800/images/";

  useEffect(() => {
    const getFriends = async () => {
      const res = await axios.get("http://localhost:8800/api/users/friends/" + currentId);
      setFriends(res.data);
    }
    getFriends();
  }, [currentId]);

  useEffect(() => {
    setOnlineFriends(friends.filter((f) => onlineUsers.includes(f._id)));
  }, [friends, onlineUsers]);

  const handleClick = async (user) => {
    try {
      const res = await axios.get(`http://localhost:8800/api/conversations/find/${currentId}/${user._id}`);
      setCurrentChat(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className='chatOnline'>
      {onlineFriends.map((o) => (
        <div key={o._id} className='chatOnlineFriend' onClick={() => handleClick(o)}>
          <div className='chatOnlineImgContainer'>
            <img className='chatOnlineImg' src={
              o?.profilePicture
                ? PF + o.profilePicture
                : PF + "person/noAvatar.png"
            } alt="" />
            <div className='chatOnlineBadge'></div>
          </div>
          <span className='chatOnlineName'>{o?.username}</span>
        </div>
      ))}
    </div>
  )
}