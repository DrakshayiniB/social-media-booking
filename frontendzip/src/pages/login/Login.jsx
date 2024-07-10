import './login.css';
import { useRef } from "react";
import { loginCall } from '../../apiCalls';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { AiOutlineLoading3Quarters } from "react-icons/ai";


export default function Login() {
  
  const email = useRef()
  const password = useRef()
  const  { isFetching,dispatch}= useContext(AuthContext)

  const handleLogin = async (e) => {
    e.preventDefault();
    loginCall({ email: email.current.value, password: password.current.value }, dispatch);
    // try {
    //   const response = await axios.post('http://localhost:8800/api/auth/login', { email:email.current.value, password:password.current.value });
    //   // Handle successful login
    //    console.log(response)
    //   navigate("/")
    // } catch (error) {
    //   // Handle login error
    //   console.error(error);
      };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">facebook</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on facebook.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleLogin}>
           
              <input ref={email} placeholder="Email" type='email'  className="loginInput" />
              <input  ref={password}  placeholder="Password" type='password' required minLength="6" className="loginInput" />
              <button className="loginButton" type='submit' disabled={isFetching}>{isFetching? <AiOutlineLoading3Quarters />  : "Log In"}</button>
              <span className="loginForgot">Forgot Password?</span>
              <button className="loginRegisterButton" >
                {isFetching? (<AiOutlineLoading3Quarters />)  : ("Create a New Account")}</button>
            </form>
          </div>
        </div>
      </div>
  
  );
}