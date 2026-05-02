import React from 'react'
import { Link } from 'react-router-dom'
import API from './api'; // ✅ NEW

function Story(props) {
    return (
        <>
            <Link to={`/stories/${props.id}`} className="story-link">

                <div className="story d-flex flex-column align-items-center mx-2">

                    <div className="story-dp-ring">
                        <div className="story-inner">

                            {/* 🔥 FIX */}
                            <img 
                                className="profile-img" 
                                src={`${API}${props.dp}`} 
                                alt="" 
                            />

                        </div>
                    </div>

                    <div className="text-center" style={{ width: "80px" }}>
                        <p className="story-name text-truncate mb-0">
                            <small>{props.name}</small>
                        </p>
                    </div>

                </div>

            </Link>
        </>
    )
}

export default Story;