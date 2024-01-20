import axios from 'axios';
import React, { useEffect, useState } from 'react'
import SpotifyPlayer from "react-spotify-web-playback"

export default function Player({ trackUri }) {

    const [data, setData] = useState("");

    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await axios.get('/token');
                //  console.log('API Response:', response.data.token);
                localStorage.setItem("access_token", response.data.token);
                localStorage.setItem("token_set","true");
                console.log(localStorage.getItem("access_token"));
                setData(localStorage.getItem("access_token"));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();

        const intervalId = setInterval(() => {
            fetchData();
        }, 1800000);

        // Cleanup function to clear the interval when the component unmounts or when the effect is re-run
        return () => {
            clearInterval(intervalId);
        };

    }, []); // Empty dependency array means the effect runs once after the initial render


    let x = trackUri.map((ele) => {
        return ele;
    })

    console.log(x);

    // if (!accessToken) return null

    return (
        <SpotifyPlayer token={data} showSaveIcon uris={x} />
    )

}
