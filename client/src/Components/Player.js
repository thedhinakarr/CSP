import React from 'react'
import SpotifyPlayer from "react-spotify-web-playback"

export default function Player({accessToken,trackUri}) {

  let x = trackUri.map((ele)=>{
    return ele;
  })

  console.log(x);

  if(!accessToken) return null

  return (
  <SpotifyPlayer token={accessToken} showSaveIcon uris={x}/>
  )
  
}
