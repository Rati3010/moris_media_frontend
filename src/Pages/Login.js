import React, { useState } from "react";
import axios from "axios";
import { url } from "../url";
import { useNavigate } from "react-router-dom";


const Login = () => {
    const [username,setUserName] = useState();
    const [password,setPassword] = useState();
    const navigate = useNavigate();
 const handleSubmit = () =>{
    if(username && password){
        axios.post(`${url}/login`,{username,password}).then((res)=>{
            localStorage.setItem('userId', JSON.stringify(res.data.user._id));
            navigate("/setting")
        }).catch((err)=>{
            console.log(err)
        })
    }
 }
  return (
    <div
      style={{
        display: "flex",
        width: "20%",
        margin: "auto",
        flexDirection: "column",
        gap: "10px",
        marginTop: "150px",
      }}
    >
      <h1>Login</h1>
      <label htmlFor="user_name">User Name</label>
      <input
        style={{
          padding: "10px 15px",
          borderRadius: "10px",
          border: "1px solid black",
        }}
        type="text"
        onChange={(e) =>setUserName(e.target.value)}
        placeholder="Enter Username"
      />
      <label htmlFor="password">Password</label>
      <input
        style={{
          padding: "10px 15px",
          borderRadius: "10px",
          border: "1px solid black",
        }}
        type="Password"
        onChange={(e) =>setPassword(e.target.value)}
        placeholder="Enter Password"
      />
      <input
        style={{
          padding: "10px 15px",
          borderRadius: "10px",
          border: "1px solid black",
        }}
        onClick={handleSubmit}
        type="submit"
      />
    </div>
  );
};

export default Login;
