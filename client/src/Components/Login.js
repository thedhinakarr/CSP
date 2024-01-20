import React from 'react';
import axios from 'axios';
import { useState } from "react";
import { useNavigate, link } from 'react-router-dom'


export default function Login() {

  const [accessToken, setAccessToken] = useState("");
  

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
   
      let { data } = await axios.get("/login");
      console.log(data.accessToken);
      let x = data.accessToken
      console.log(x);
      setAccessToken();
  
    } catch (error) {
      console.log(error)
    }
  }

  const openInNewWindow = (e) => {
    e.preventDefault();
    window.open('http://localhost:8888/login', '_blank');
  };


  return (
    <div>
      {/* <button className="border text-white border-white" onClick={openInNewWindow}>
        Login With Spotify
      </button> */}

      <a className="border text-white border-white p-6 mt-1" href='http://localhost:8888/login' >
        Login With Spotify
      </a>

    </div>
  )
}
