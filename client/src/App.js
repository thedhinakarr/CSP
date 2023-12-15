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
      setAccessToken("BQC8h9PjQ_VJM-xWgBF0UgE1w4tBpCcp7BcZ078dFt6aHszACteuItqiarZXP5CHnEuZe4o8xXhxB_sNKwQikYlSQRpn9pXVd8-LrNMkEaIPtVN8w39Eclh9kL1zi8EGgKepP5dakYzVJeIdQPYDvFy4GQEf6D0WS5n_YhEl2ygUSzxg2mT5hFZwNyuSRdOB-xU4lbRtLSLgiwnZUWw9iWzJ0_4zoZHpPdo7VjNyqyOHJyGCOsuTtMFjFn3_I3-FcXz2OfoW0CbtVHppbv3coXSTE8KmbIZpNyfJLXh4knKK2D6W9w-erWCHf4qfGcYojvunMpUCx7rlK");
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
        <Player accessToken="BQDbq0CPAxXj3UyGmvVAS1TpKWi8wFjIE53D6n-CRCxOLbFzebRi0ia0bIm-aNamrNavNYDN2QVJ17KK-s8k5fQ-IRLqTUogtNMnJLIX2-SMTrTjtMpmfIMK8_8hLZ_kpnO5zTMm33BFHh3exG5WymRJT1-x6u5EbMwQRgIAcxVs8Xm1QuGHwTck72TdnYbdZ3VjuwH-MvNfIvDu3zCix4cKU17o4gq9B3o2DwRg9_lMRfJCxsEjx-q22D0Xh3Q8cFOBmcjWEtkthE8YKBm2vrLgU-ZL8daKvRnw6kjmVxkyw7fjT7HlBOrQt6HZ9GBaHZPstnvIeF9jTUUGt8bzGY3J" trackUri={url} />
      </div>
    </div>

  );
}

export default App;
