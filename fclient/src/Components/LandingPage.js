import React from 'react'

export default function LandingPage() {

    return (
        <div className="py-8 px-4 bg-[#000000] mx-auto justify-items-center h-screen w-screen text-center lg:py-16 lg:px-12">
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-purple-500 md:text-5xl lg:text-6xl "> CSP v1_0 </h1>
            <p className="mb-8 text-lg font-normal text-white lg:text-xl sm:px-16 xl:px-48 "> Search for music however you wish to. </p>
            <div clasName="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
                <a onClick={localStorage.setItem("token_set","true")} href="http://localhost:8888/login" className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg border border-gray-300 hover:bg-susYGreen focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-purple-700 dark:focus:ring-gray-800">
                    Login with Spotify
                </a>
            </div>

        </div>

    )
}
