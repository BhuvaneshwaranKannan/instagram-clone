import React, { useState } from 'react'
import Sidebar from './Sidebar'
import Feed from './Feed'
import SuggestionList from './SuggestionList';
import Messages from './Messages';

import instaLogo from './assets/instaLogo.png'

import { useEffect } from "react";
import useFetch from './useFetch';

function Home() {

    const [homePage, sethomePage] = useState(false)

    useEffect(() => {
        if (!homePage) {
            const timer = setTimeout(() => {
                sethomePage(true);
            }, 2000);

            return () => clearTimeout(timer); // cleanup
        }
    }, [homePage]);

    return (
        <>
            {
                homePage ? (
                    <div className='d-flex vh-100'>

                        <div className='w-14'> <Sidebar /> </div>

                        <div className='w-50'> <Feed /> </div>

                        <div className='w-23'> <SuggestionList /> </div>

                        <div className='w-18'> <Messages /></div>

                    </div>
                ) : (

                    <div className="homeLoadPage">

                        <div className="loadingPageInstaIcon">
                            <img src={instaLogo} alt="" className='loadingPageIcon' />

                        </div>
                        <div className="loadingPageCaption">
                            <div className='lpcFrom'>
                                <h6>from</h6>
                            </div>
                            <div>
                                <h3 className='colorQuote'>V I S H I</h3>
                            </div>
                        </div>

                    </div>
                )
            }

        </>

    )
}

export default Home
