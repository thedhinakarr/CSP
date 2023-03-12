import { useState } from "react";
import React, { createRef } from "react";
import axios from "axios";
import Player from "./Components/Player"

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
      setAccessToken("BQCpzrYw7I-j-x1RCXFvu02Dl5wtrg-4KRpL-E04unrswa6hX5-k9uQJDhPee5_B5XiWSrqJHNv4SK8LIoFsHxLZ5l9JBRafNt9ZnMmL11UE_rwurqXANjEvEqmnU6mMumJFWkqRDPnF4uewWVk2EiwVITk7Od0JiTyp5ez14_X3ucU0fne-UZlJgavYE8ZsJW1USInmmFS2zJBaTyeDMXwiE2z__1wCVmlEJOceM8_iZjcjNSWvez_YutvhvMBwFm4gPaMsiCfAG1ggO9BCveNGT9rrGks-TgemcJcCNuoWqqU2ywaLR0UNgp0pyw6CIGJm4iKHdPppSc4NNG_ombIYYQ");
      setUrl(data.result);
      console.log(data.result)
    } catch (error) {
      console.log(error)
    }
  }


  return (

    <div className="flex bg-black h-screen w-screen items-center justify-center p-5">
      <div className="w-1/2 rounded-lg  pb-7 ">
        <h1 className="font-semibold text-purple-500 text-6xl">What's up? </h1>
        <form className="flex pt-2 pb-10">
          <input type="text" placeholder="Ex: I feel < FEELING >, recommend me a <LANGUAGE/GENRE/Artist> song" name="query" onChange={onChangeHandler} className="placeholder- w-full rounded-tl-lg rounded-bl-lg bg-white p-2 text-base font-semibold outline-0" id="" />
          <button type="submit" name="submit" onClick={onSubmitHandler} className="bg-purple-500 p-3 rounded-tr-lg rounded-br-lg text-white font-semibold hover:bg-purple-800 transition-colors">Search</button>
        </form>
        <Player accessToken={accessToken} trackUri={url} />
      </div>
    </div>

  );
}

export default App;
