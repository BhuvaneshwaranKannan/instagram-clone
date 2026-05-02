import React from 'react'

function Highlights(props) {
    return (
        <>
            <div className="highlight d-flex flex-column align-items-center mx-2">

                <div className="highlight-dp-ring">
                        <img className="profile-img" src={props.dp} alt="xx" />
                </div>

                <div className="text-center" style={{ width: "80px" }}>
                    <p className="story-name text-truncate mb-0">
                        <small >{props.name}</small>
                    </p>
                </div>

            </div>
        </>
    )
}

export default Highlights
