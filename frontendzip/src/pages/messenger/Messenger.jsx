import React, { useContext, useEffect, useRef, useState } from 'react'
import "./messenger.css"
import Topbar from "../../components/topbar/Topbar";
import Conversation from '../../components/conversations/Conversation';
import Message from '../../components/message/Message';
import ChattOnline from '../../components/chattOnline/ChattOnline';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import io from "socket.io-client"


export default function Messenger() {
  const [conversations,setConversations]= useState([]);
  const [currentChat,setCurrentChat]= useState(null);
  const [messages,setMessages]= useState([]);
  const [newmessages,setNewMessages]= useState("");
  const [arrivalMessage,setArrivalMessage]= useState(null);
  const [onlineUsers,setOnlineUsers]= useState([]);
  const {user} = useContext(AuthContext);
  const scrollRef = useRef();
 const socket = useRef();
 

 useEffect(() => {
  socket.current = io("http://localhost:8900");
  socket.current.on("getMessage",data=>{
setArrivalMessage({
  sender:data.senderId,
  text:data.text,
  createdAt:new Date.now()
  })
  });
  }, []);
  
  useEffect(() => {
    arrivalMessage && currentChat?.members.includes(arrivalMessage.sender) &&
     setNewMessages((prev) => [...prev,arrivalMessage]);
    }, [arrivalMessage, currentChat]);


    useEffect(()=>{
  socket.current.emit("addUser",user._id);
  socket.current.on("getUsers",(users)=>{
  setOnlineUsers(user.followings.filter((f)=> users.some((u)=> u.userId === f)));
  });
},[user]);
console.log(user)

  useEffect(()=>{
    const getConversations = async () => {
      try {
        const res = await axios.get("http://localhost:8800/api/conversations/"+user._id)
        setConversations(res.data)
          } catch (error) {
            console.log(error)
            }
            };
            getConversations();
            },[user._id])

            
 useEffect(()=>{
  const getMessages = async () => {
       try {
       const res = await axios.get("http://localhost:8800/api/messages/"+currentChat?._id)
        setMessages(res.data)
    } catch (error) {
       console.log(error)
      }
     };
    getMessages()
  },[currentChat?._id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const message = {
      senderId: user._id,
      text: newmessages,
      conversationId: currentChat._id,
      };

      const receiverId = currentChat.members.find((member) => member !== user._id)

     socket.current.emit("sendMessage",{
        senderId: user._id,
        receiverId,
      text: newmessages,
       });

      try {
        const res = await axios.post("http://localhost:8800/api/messages",message)
        setMessages([...messages,res.data])
        setNewMessages("");
        } catch (error) {
          console.log(error)
          }
  };



  useEffect(()=>{
    scrollRef.current?.scrollIntoView({behavior: "smooth" });
   },[messages])


  return (
    <>
    <Topbar />
    <div className='messenger'>
   <div className='chatMenu'>
    <div className='chatMenuWrapper'>
      <input type="text" placeholder='Search for friends' className='chatMenuInput' />
      {conversations.map((c)=>(
        <div key={c._id} onClick={()=>setCurrentChat(c)}>
        <Conversation key={c._id} conversation={c} currentUser={user}/>
        </div>
        ))}
     
     
    </div>

   </div>
   <div className='chatBox'>
    <div className='chatBoxWrapper'>
      {currentChat ?
      <>
       <div className='chatBoxTop'>
        {messages.map((m)=>(
       <div key={m._id}  ref={scrollRef}>
         <Message  message={m} own= {m.senderId === user._id}/> 
       </div>
        ))}
   </div>
       <div className='chatBoxBottom'>
        <textarea  className='chatMessageInput'
         placeholder='write something...'  
         onChange={(e)=>setNewMessages(e.target.value)}
          value={newmessages}
          ></textarea>
        <button className='chatSubmitButton' onClick={handleSubmit}>Send</button>
       </div></> : <span className='noConversationText'>Open a conversation to start a chat.</span>}
    </div>
   </div>
   <div className='chatOnline'>
    <div className='chatOnlineWrapper'>
   <ChattOnline  onlineUsers={onlineUsers} currentId={user._id} setCurrentChat={setCurrentChat}/>
   
    </div> 
   </div>
   
    </div>
    </>
  )
}
