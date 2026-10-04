import React, { useState } from 'react'
import Sidebar from './Sidebar'
import Feed from './Feed'
import SuggestionList from './SuggestionList';
import Messages from './Messages';
import MobileNavigation from './MobileNavigation'

import instaLogo from './assets/instaLogo.png'

import { useEffect } from "react";

function Home() {

    const [homePage, sethomePage] = useState(false)

    useEffect(() => {
        if (!homePage) {
            const timer = setTimeout(() => {
                sethomePage(true);
            }, 1000);

            return () => clearTimeout(timer);
        }
    }, [homePage]);

    return (
        <>
            {
                homePage ? (
                    <div className='d-flex vh-100 app-shell home-shell'>

                        <MobileNavigation />

                        <div className='w-14 desktop-sidebar'> <Sidebar /> </div>

                        <main className='w-50 feed-column'> <Feed /> </main>

                        <div className='w-23 suggestion-column'> <SuggestionList /> </div>

                        <div className='w-18 messages-column'> <Messages /></div>

                    </div>
                ) : (

                    <div className="homeLoadPage" aria-live="polite" aria-label="Loading home page">

                        <div className="loadingPageInstaIcon">
                            <div className="loadingPageIconFrame">
                                <img src={instaLogo} alt="" className='loadingPageIcon' />
                            </div>

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
