import React from 'react'
import Player from './Player'
import Post from './Post'

export default function Feed() {
    return (
        <div>
            <div className='bg-black'>
                <div className="flex justify-center w-screen h-screen px-4 text-white">

                    <div className="flex w-full max-w-screen-lg">
                        {/* Navbar */}
                        <div className="flex flex-col  py-4 pr-3 text-green-700">
                            <a
                                className="px-3 py-2 mt-2 text-lg font-medium rounded-sm hover:bg-gray-300"
                                href="#"
                            >
                                Player
                            </a>


                            <a
                                className="px-3 py-2 mt-2 text-lg font-medium rounded-sm hover:bg-gray-300"
                                href="#"
                            >
                                Profile
                            </a>
                            <a
                                className="flex px-3 py-2 mt-auto text-lg rounded-sm font-medium hover:bg-gray-200"
                                href="#"
                            >
                                <span className="flex-shrink-0 w-10 h-10 bg-green-500 rounded-full" />
                                <div className="flex flex-col ml-2">
                                    <span className="mt-1 text-sm font-semibold leading-none">
                                        Dhinakar
                                    </span>
                                    <span className="mt-1 text-xs leading-none">@theDhinakarr</span>
                                </div>
                            </a>
                        </div>


                        <div className="flex flex-col flex-grow w-2/3 border-l border-r border-green-700">

                            <div className="flex flex-col justify-between flex-shrink-0 px-8 py-4 border-b border-green-700">
                                <h1 className="text-xl font-semibold mb-3 ">How's life Dhinakar?</h1>
                                <Player
                                    accessToken="BQCEZeHmgdh08rJ_0ARlnoDjofWeuBxOushrxtdRksKmmMtEJrl31vVd3YrtrDU3hJu4zIUKlJJ73qBbWU0LQ6So8kHn9q6WcJhHMExns0YWoZPntT5yO9td9daX3BqXul0KBtr1Te64Z10sXG3CQCISShpcJEAIz2qeuyKmHojqSrN7AX3otaz-Mc9m-jvKMrFujYAMtpFuteVdoypzs4NJCkPeo7u0oCHfRMxopjGQ_xGMd95RkTniNp4oEv03Z3mpvhD6maMd82loC9147TSj9j73D9jdwq0uE1brYDLmnH71kNs6PO3cjMU9qhW4ndtP2GRwJror2n2ZOw14pU-vxg"
                                    trackUri={[
                                        'spotify:track:0O45fw2L5vsWpdsOdXwNAR'
                                    ]}
                                />

                            </div>

                            <div className="flex-grow h-0 overflow-auto">



                                <Post />
                                <Post />
                                <Post />
                                <Post />
                                <Post />
                                <Post />
                                <Post />



                            </div>
                        </div>


                        <div className="flex flex-col flex-shrink-0 w-1/4 py-4 pl-4">

                            <input
                                className="flex placeholder-green-700 items-center h-8 px-2 border border-gray-500 rounded-sm"
                                type="search"
                                placeholder="Search for friends..."
                            />

                            {/* <div>
                            <h3 className="mt-6 font-semibold">Trending</h3>
                            <div className="flex w-full py-4 border-b border-green-700">
                                <span className="flex-shrink-0 w-10 h-10 bg-gray-400 rounded-full" />
                                <div className="flex flex-col flex-grow ml-2">
                                    <div className="flex text-sm">
                                        <span className="font-semibold">Username</span>
                                        <span className="ml-1">@username</span>
                                    </div>
                                    <p className="mt-1 text-sm">
                                        <Clip/>
                                    </p>
                                </div>
                            </div>

                            <div className="flex w-full py-4 border-b border-green-700">
                                <span className="flex-shrink-0 w-10 h-10 bg-gray-400 rounded-full" />
                                <div className="flex flex-col flex-grow ml-2">
                                    <div className="flex text-sm">
                                        <span className="font-semibold">Username</span>
                                        <span className="ml-1">@username</span>
                                    </div>
                                    <p className="mt-1 text-sm">
                                       <Clip/>
                                    </p>
                                </div>
                            </div>
                        </div> */}

                        </div>
                    </div>
                </div>

                <a
                    className="fixed flex items-center justify-center h-8 pr-2 pl-1 bg-green-600 rounded-full bottom-0 right-0 mr-4 mb-4 shadow-lg text-blue-100 "
                    href="https://twitter.com/thedhinakarr"
                    target="_top"
                >
                    <span className="text-sm ml-1 leading-none">@thedhinakarr</span>
                </a>
            </div>
        </div>
    )
}
