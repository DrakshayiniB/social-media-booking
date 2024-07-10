import { useRef } from "react";
import "./register.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const username = useRef()
 const email = useRef() 
 const password = useRef()
 const passwordAgain = useRef()
const navigate = useNavigate()

  const UserRegistration = async(event)=>{
event.preventDefault()
if (passwordAgain.current.value !== password.current.value) {
  passwordAgain.current.setCustomValidity("Passwords don't match!");
} else {
  const user = {
    username: username.current.value,
    email: email.current.value,
    password: password.current.value,
  };
  try {
   await axios.post("http://localhost:8800/api/auth/register", user);
navigate("/login");
  } catch (err) {
    console.log(err);
  }
}
    
  }
return (
    <div className="login">
      <div className="loginWrapper">
        <div className ="loginLeft">
          <h3 className="loginLogo">facebook</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on facebook.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={UserRegistration}>
            <input ref={username}placeholder="Username"  className="loginInput" />
            <input ref={email} placeholder="Email"  className="loginInput" />
            <input ref={password} placeholder="Password"  minLength="6" className="loginInput" />
            <input ref={passwordAgain} placeholder="Password Again"  className="loginInput" />
            <button  type="submit" className="loginButton">Sign Up</button>
            <button className="loginRegisterButton">
              Log into Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
