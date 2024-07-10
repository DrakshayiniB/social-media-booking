import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Home from './pages/home/Home.jsx'
import Login from './pages/login/Login.jsx'
import Profile from './pages/profile/Profile.jsx'
import Register from './pages/register/Register.jsx'
import { AuthContextProvider} from "./context/AuthContext.jsx"
import React from 'react'
// import {
//   createBrowserRouter,
//   RouterProvider,
// } from "react-router-dom";



// const router = createBrowserRouter([
//   {
//     path: "/",
//     element:user ? <Home />: <Register />,
//   },{
//     path:'/login',
//     element:<Login/>,
//   },
//   {
//     path: "/register",
//     element: <Register />,
//     },{
//       path:'/profile/:username',
//       element:<Profile/>,
//     }
// ]);

ReactDOM.createRoot(document.getElementById('root')).render(
 <React.StrictMode>
 <AuthContextProvider>
 <App />
 </AuthContextProvider>
 </React.StrictMode>,
  
);
