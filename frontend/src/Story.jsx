import React from 'react'
import { Link } from 'react-router-dom'
import API from './api';

function Story(props) {
    const destination = props.isOwn ? '/profile' : `/stories/${props.id}`

    return (
        <>
            <Link to={destination} className="story-link">

                <div className={`story d-flex flex-column align-items-center mx-2${props.isOwn ? ' your-story' : ''}`}>
                    <div className="story-dp-ring">
                        <div className="story-inner">

                            <img 
                                className="profile-img" 
                                src={`${API}${props.dp}`} 
                                alt="" 
                            />

                        </div>
                    </div>

                    {props.isOwn && <span className="your-story-add"><i className="bi bi-plus-lg" /></span>}

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