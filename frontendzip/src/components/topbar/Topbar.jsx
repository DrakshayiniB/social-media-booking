import { useContext } from "react";
import "./topbar.css";
import { FaSearch, FaUser, FaComment, FaBell } from "react-icons/fa";
import { Link } from "react-router-dom";
import {AuthContext} from "../../context/AuthContext"

export default function Topbar() {
  const {user} = useContext(AuthContext)
  const PF = "http://localhost:8800/images/"
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
      <Link to="/" style={{textDecoration:"none"}}>
      <span className="logo">facebook</span>
      </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <FaSearch className="searchIcon" />
          <input
            placeholder="Search for friend, post or video"
            className="searchInput"
          />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink">Homepage</span>
          <span className="topbarLink">Timeline</span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <FaUser />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <FaComment />
            <span className="topbarIconBadge">2</span>
          </div>
          <div className="topbarIconItem">
            <FaBell />
            <span className="topbarIconBadge">1</span>
          </div>
        </div>
        <Link to={`/profile/${user.username}`}>
        <img src={user.profilePicture 
          ? PF+user.profilePicture 
          : PF+"person/noAvatar.png"
          }alt="" className="topbarImg"/>
          </Link>
      </div>
    </div>
  );
}