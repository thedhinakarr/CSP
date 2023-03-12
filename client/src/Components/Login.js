import React from 'react'

const AUTH_URL =
  "https://accounts.spotify.com/authorize?client_id=aac240d4bf1a4be3a913e3dd9575361c&response_type=code&redirect_uri=http://localhost:8888/callbackk&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"

export default function Login() {
  return (
    <div>
         <a className="border border-white p-6" href={AUTH_URL}>
        Login With Spotify
      </a>
    </div>
  )
}
