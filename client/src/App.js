import { useState } from "react";
import React, { createRef } from "react";
import axios from "axios";
import Player from "./Components/Player"
import Login from "./Components/Login"
import { Routes, Route } from "react-router-dom";
import { useNavigate, Link } from "react-router-dom";


function App() {

  const [userData, setUserData] = useState({
    query: ""
  });
  const [url, setUrl] = useState([]);
  const [accessToken, setAccessToken] = useState("")

  const ref = createRef(null);

  const onChangeHandler = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    })
    console.log(userData)
  }

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      console.log(userData)
      let { data } = await axios.post("/search", userData);
      console.log(data.accessToken);
      let x = data.accessToken
      console.log(x);
      setAccessToken("BQB0JL7xU9Y97oEy8AcggkV2q3IzoyC02-LBo-VjZoV3naya4G6Czwr4ZbTtGd9akXPILlr8oYsxO_jD89yJxPKixUq-gEgsGck5SoDgXCN5BLWvOvS4yT_EEHdBkFjyCar7b4jQlaz44buRbE-QseZw6S32O96oQRt7WFI7b-Wadsl0tnY9tmV4BYiubG9AjEX3f1epZzfHwQUcOtW0B1ZhF4s8KcUTQqkmToqfv2Vq69zhLovZCuVxVEEdlfAeIXtbDMlAW1K7y26rmowf-5pB8E-wUMqaK-xrKc60aCUcF7kSwT8mIO6tC3rd6nb4oMl8h69yDmVkaUx7vRB_");
      setUrl(data.result);
      console.log(data.result)
    } catch (error) {
      console.log(error)
    }
  }


  return (

    // <div className="flex bg-black h-screen w-screen items-center justify-center p-5">
    //   <div className="w-1/2 rounded-lg  pb-7 ">
    //     <h1 className="font-semibold text-purple-500 text-6xl">What's up? </h1>
    //     <form className="flex pt-2 pb-10">
    //       <input type="text" placeholder="Ex: I feel < FEELING >, recommend me a <LANGUAGE/GENRE/Artist> song" name="query" onChange={onChangeHandler} className="placeholder- w-full rounded-tl-lg rounded-bl-lg bg-white p-2 text-base font-semibold outline-0" id="" />
    //       <button type="submit" name="submit" onClick={onSubmitHandler} className="bg-purple-500 p-3 rounded-tr-lg rounded-br-lg text-white font-semibold hover:bg-purple-800 transition-colors">Search</button>
    //     </form>
    //     <Player accessToken="BQB0JL7xU9Y97oEy8AcggkV2q3IzoyC02-LBo-VjZoV3naya4G6Czwr4ZbTtGd9akXPILlr8oYsxO_jD89yJxPKixUq-gEgsGck5SoDgXCN5BLWvOvS4yT_EEHdBkFjyCar7b4jQlaz44buRbE-QseZw6S32O96oQRt7WFI7b-Wadsl0tnY9tmV4BYiubG9AjEX3f1epZzfHwQUcOtW0B1ZhF4s8KcUTQqkmToqfv2Vq69zhLovZCuVxVEEdlfAeIXtbDMlAW1K7y26rmowf-5pB8E-wUMqaK-xrKc60aCUcF7kSwT8mIO6tC3rd6nb4oMl8h69yDmVkaUx7vRB_" trackUri={url} />
    //   </div>
    // </div>

    <div>
      <Login />

    </div>




  );
}

export default App;
