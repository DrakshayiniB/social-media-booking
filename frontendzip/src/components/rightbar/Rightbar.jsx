import "./rightbar.css";
import { Users } from "../../App";
import Online from "../online/Online";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { IoIosAdd } from "react-icons/io";
import { MdMinimize } from "react-icons/md";

export default function Rightbar({ user }) {
  const PF = "http://localhost:8800/images/";
  const [friends, setFriends] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [followed, setFollowed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentUser && user) {
      setFollowed(currentUser.followings.includes(user._id));
    }
  }, [currentUser, user]);

  useEffect(() => {
    const getFriends = async () => {
      if (user?._id) {
        try {
          setLoading(true);
          const friendList = await axios.get(`http://localhost:8800/api/users/friends/${user._id}`);
          setFriends(friendList.data);
        } catch (error) {
          console.error("Error fetching friends:", error);
          setFriends([]);
        } finally {
          setLoading(false);
        }
      }
    };
    getFriends();
  }, [user]);

  const handleClick = async () => {
    try {
      if (followed) {
        await axios.put(`http://localhost:8800/api/users/${user._id}/unfollow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        await axios.put(`http://localhost:8800/api/users/${user._id}/follow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "FOLLOW", payload: user._id });
      }
      setFollowed(!followed);
    } catch (err) {
      console.error("Error following/unfollowing user:", err);
    }
  };

  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img className="birthdayImg" src="assets/gift.png" alt="" />
          <span className="birthdayText">
            <b>Pola Foster</b> and <b>3 other friends</b> have a birthday today.
          </span>
        </div>
        <img className="rightbarAd" src="assets/ad.png" alt="" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {Users.map((u) => (
            <Online key={u.id} user={u} />
          ))}
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
    if (!user) return null;

    return (
      <>
        {user.username !== currentUser?.username && (
          <button className="rightbarFollowButton" onClick={handleClick}>
            {followed ? "Unfollow" : "Follow"}
            {followed ? <MdMinimize /> : <IoIosAdd />}
          </button>
        )}
        <h4 className="rightbarTitle">User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{user.city || "Not specified"}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{user.from || "Not specified"}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">
              {user.relationship === 1 ? "Single" : user.relationship === 2 ? "Married" : "Not specified"}
            </span>
          </div>
        </div>
        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings">
  {(Array.isArray(friends) ? friends : [friends]).map(friend => (
              <Link   key={friend._id} to={`/profile/${friend.username}`} style={{ textDecoration: "none" }}>
                <div className="rightbarFollowing">
                  <img
                    src={friend.profilePicture 
                      ? PF+friend.profilePicture
                       : PF+"person/noAvatar.png"}
                    alt=""
                    className="rightbarFollowingImg"
                  />
                  <span className="rightbarFollowingName">{friend.username}</span>
                </div>
              </Link>
            ))}
         </div>
      
      
      </>
    );
  };

  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}