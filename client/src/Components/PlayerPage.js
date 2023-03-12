import React, { createRef } from 'react'
import Player from './Player'
import { useState } from 'react'
import axios from 'axios'
import { useScreenshot } from 'use-react-screenshot'

export default function PlayerPage() {
    const [userData, setUserData] = useState({
        query: ""
    });
    const [url, setUrl] = useState([]);
    const [accessToken, setAccessToken] = useState("")
    const ref = createRef(null)

    const [image, takeScreenshot] = useScreenshot()

    const getImage = () => takeScreenshot(ref.current)



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
            setAccessToken("BQCEZeHmgdh08rJ_0ARlnoDjofWeuBxOushrxtdRksKmmMtEJrl31vVd3YrtrDU3hJu4zIUKlJJ73qBbWU0LQ6So8kHn9q6WcJhHMExns0YWoZPntT5yO9td9daX3BqXul0KBtr1Te64Z10sXG3CQCISShpcJEAIz2qeuyKmHojqSrN7AX3otaz-Mc9m-jvKMrFujYAMtpFuteVdoypzs4NJCkPeo7u0oCHfRMxopjGQ_xGMd95RkTniNp4oEv03Z3mpvhD6maMd82loC9147TSj9j73D9jdwq0uE1brYDLmnH71kNs6PO3cjMU9qhW4ndtP2GRwJror2n2ZOw14pU-vxg");
            setUrl(data.result);
            console.log(data.result)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <div className="flex bg-black h-screen w-screen items-center justify-center p-5">
                <div ref={ref} className="w-1/2 rounded-lg  pb-7 ">
                    <h1 className="font-semibold text-green-500 text-6xl">What's up? </h1>
                    <form className="flex pt-2 pb-10">
                        <input type="text" placeholder="Ex: I feel < FEELING >, recommend me a <LANGUAGE/GENRE/Artist> song" name="query" onChange={onChangeHandler} className="placeholder- w-full rounded-tl-lg rounded-bl-lg bg-white p-2 text-base font-semibold outline-0" id="" />
                        <button type="submit" name="submit" onClick={onSubmitHandler} className="bg-green-500 p-3 rounded-tr-lg rounded-br-lg text-white font-semibold hover:bg-green-800 transition-colors">Search</button>
                    </form>
                    <Player accessToken={accessToken} trackUri={url} />
                    <button className='bg-green-500 p-3 mt-3 rounded-lg text-white font-semibold hover:bg-green-800 transition-colors'>Go back Home</button>
                    <button className='bg-green-500 p-3 mt-3 rounded-lg text-white font-semibold hover:bg-green-800 transition-colors' onClick={getImage}>
                        Take screenshot
                    </button>
                </div>
                <img width={400} src={image} alt={'Screenshot'} />
            </div>

        </div>
    )
}
