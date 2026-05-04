import React from 'react'
import useFetch from './useFetch'
import Suggestion from './Suggestion';
import SuggestionProfile from './SuggestionProfile';
import API from './api'; 

function SuggestionList() {

    const [list] = useFetch(`${API}/suggestions`);

    const suggestionList = list.map((s) => (
        <Suggestion
            key={s.id}
            id={s.id}
            name={s.user.username}
            dp={s.user.profile_pic} 
        />
    ));

    return (
        <>
            <div>

                <div className='suggest-profile'>
                    <SuggestionProfile />
                </div>

                <div>
                    <div className="d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center">
                            <p className='mx-4'>Suggested for you</p>
                        </div>
                        <div>
                            <p className='mx-2'>See all</p>
                        </div>
                    </div>
                </div>

                {suggestionList}

                <div className="suggest-credits d-flex flex-wrap mx-3">

                    <div className="d-flex flex-wrap">
                        <p className='suggest-credits-items'>About</p>
                        <p className='suggest-credits-items'>Help</p>
                        <p className='suggest-credits-items'>Press</p>
                        <p className='suggest-credits-items'>API</p>
                        <p className='suggest-credits-items'>Jobs</p>
                        <p className='suggest-credits-items'>Privacy</p>
                        <p className='suggest-credits-items'>Terms</p>
                        <p className='suggest-credits-items'>Locations</p>
                        <p className='suggest-credits-items'>Language</p>
                        <p className='suggest-credits-items'>Meta Verified</p>
                    </div>

                    <div className='mt-3'>
                        © 2026 INSTAGRAM FROM Vishi
                    </div>

                </div>

            </div>
        </>
    )
}

export default SuggestionList