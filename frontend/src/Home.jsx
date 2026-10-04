import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import Feed from './Feed'
import SuggestionList from './SuggestionList';
import Messages from './Messages';
import MobileNavigation from './MobileNavigation'
import { useLocation, useNavigate } from 'react-router-dom'

import instaLogo from './assets/instaLogo.png'

function Home() {

    const location = useLocation()
    const navigate = useNavigate()
    const [homePage, sethomePage] = useState(() => !location.state?.showHomeLoader)

    useEffect(() => {
        if (location.state?.showHomeLoader) {
            navigate(location.pathname, { replace: true, state: null })
        }
    }, [location.pathname, location.state, navigate])

    useEffect(() => {
        if (!homePage) {
            const timer = setTimeout(() => {
                sethomePage(true);
            }, 2000);

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
