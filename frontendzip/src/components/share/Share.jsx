import "./share.css";
import { FaImage, FaTag, FaMapMarker, FaSmile } from "react-icons/fa";
import {useContext, useRef, useState} from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { MdOutlineCancel } from "react-icons/md";

export default function Share() {
  const {user} = useContext(AuthContext)
  const PF = "http://localhost:8800/images/";
  const desc = useRef()
  const [file,setFile]= useState()


  const submitHandler = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
      };

      if(file){
        const data = new FormData();
        const filename = Date.now() + file.name;
        data.append("name", filename);
        data.append("file", file);
        newPost.img = filename;
        try {
          await axios.post("http://localhost:8800/api/upload", data)
          } catch (err) {}
          

      }
      try {
        await axios.post("http://localhost:8800/api/posts",newPost);
        window.location.reload()
      } catch (err) {}
        };

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img className="shareProfileImg" src={user.profilePicture 
            ? PF+user.profilePicture 
            : PF+"person/noAvatar.png"
            } alt="" />
          <input
            placeholder={"What's in your mind "+ user.username +"?"}
            className="shareInput"
            ref={desc}
          />
        </div>
        <hr className="shareHr"/>
        {file && (
        <div className="shareImgContainer">
          <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
          <MdOutlineCancel  className="shareCancelImg" onClick={()=> setFile(null)}/>
          </div>
          )}
        <form className="shareBottom" onSubmit={submitHandler}>
            <label htmlFor="file" className="shareOptions">
                <div className="shareOption">
                    <FaImage className="shareIcon"/>
                    <span className="shareOptionText">Photo or Video</span>
                    <input style={{display:"none"}} type="file" id="file" accept=".png,.jpeg,.jpg " onChange={(e)=>setFile(e.target.files[0])}/>
                </div>
                <div className="shareOption">
                    <FaTag  className="shareIcon"/>
                    <span className="shareOptionText">Tag</span>
                </div>
                <div className="shareOption">
                    <FaMapMarker  className="shareIcon"/>
                    <span className="shareOptionText">Location</span>
                </div>
                <div className="shareOption">
                    <FaSmile  className="shareIcon"/>
                    <span className="shareOptionText">Feelings</span>
                </div>
            </label>
            <button className="shareButton" type="submit">Share</button>
        </form>
      </div>
    </div>
  );
}