import React from 'react'
import Sidebar from './Sidebar'
import Feed from './Feed'
import SuggestionList from './SuggestionList';
import Messages from './Messages';


function Home() {

    return (
        <>
            <div className='d-flex vh-100'>

                <div className='w-14'> <Sidebar /> </div>

                <div className='w-50'> <Feed /> </div>

                <div className='w-23'> <SuggestionList /> </div>

                <div className='w-18'> <Messages /></div>

            </div>
        </>

    )
}

export default Home
