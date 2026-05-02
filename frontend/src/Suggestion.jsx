import React, { useState } from 'react'
import API from './api'; // ✅ NEW

function Suggestion(props) {

    const [suggestFollow, setsuggestFollow] = useState(false); 

    return (
        <>
            <div className="d-flex align-items-center justify-content-between mb-2">
                <div className="d-flex align-items-center mx-3">

                    <div className="suggest-dp mx-2">

                        {/* 🔥 FIX */}
                        <img 
                            className='profile-img' 
                            src={`${API}${props.dp}`} 
                            alt="" 
                        />

                    </div>

                    <div className="d-flex flex-column">
                        <div className="d-flex align-items-center gap-1">
                            <h6 className='mb-0'>{props.name}</h6>
                        </div>
                        <small className='grey-color'>followed by xxx +2</small>
                    </div>

                </div>

                <div className="d-flex align-items-center gap-3 me-2">

                    {
                        suggestFollow ? (
                            <span 
                                className="suggest-following" 
                                onClick={() => setsuggestFollow(false)}
                            >
                                Following
                            </span>
                        ) : (
                            <span 
                                className="follow text-primary" 
                                onClick={() => setsuggestFollow(true)}
                            >
                                Follow
                            </span>
                        )
                    }

                </div>
            </div>
        </>
    )
}

export default Suggestion