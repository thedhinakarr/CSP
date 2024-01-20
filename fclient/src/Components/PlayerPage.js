import React from 'react';
import Player from './Player';
import { useState } from "react";
import axios from "axios";

export default function PlayerPage() {


    const [userData, setUserData] = useState({
        query: ""
    });

    const [url, setUrl] = useState([]);

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
                <Player trackUri={url} />
            </div>
        </div>

    )
}
