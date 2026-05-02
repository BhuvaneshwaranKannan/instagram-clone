import React, { useState } from 'react'
import useFetch from './useFetch';
import instaIcon from '../db/assets/instaIcon.png'
import { useNavigate } from 'react-router-dom';
import API from './api'; // ✅ NEW

function Sidebar() {

    // ✅ FIX 1 — API
    const [list] = useFetch(`${API}/profile`);

    const [expanded, setExpand] = useState(false);
    const [metaOption, setMetaOption] = useState(false);
    const [moreOption, setMoreOption] = useState(false);
    const [switchAcc, setSwitchAcc] = useState(false);

    const navigate = useNavigate();

    if (!list || list.length === 0) {
        return <div>Loading...</div>;
    }

    const user = list[0].user;

    return (
        <>
            <div 
                className='barContainer' 
                onMouseEnter={() => setExpand(true)} 
                onMouseLeave={() => setExpand(false)}
            >

                {expanded ? (
                    <div>

                        <div className="d-flex flex-column mb-3" onClick={() => navigate('/home')}>
                            <div className="p-2 instaIcon mt-3">
                                <img src={instaIcon} alt="Icon" />
                            </div>
                        </div>

                        <div className="d-flex flex-column mt-5 gap-1">

                            <div className="p-2 navi mt-4" onClick={() => navigate('/home')}>
                                <i className="sideIcon bi bi-house-door-fill"></i>Home
                            </div>

                            <div className="p-2 navi">
                                <i className="sideIcon bi bi-play-btn"></i>Reels
                            </div>

                            <div className="p-2 navi">
                                <i className="sideIcon bi bi-send"></i>Messages
                            </div>

                            <div className="p-2 navi">
                                <i className="sideIcon bi bi-search"></i>Search
                            </div>

                            <div className="p-2 navi">
                                <i className="sideIcon bi bi-compass"></i>Explore
                            </div>

                            <div className="p-2 navi">
                                <i className="sideIcon bi bi-suit-heart"></i>Notifications
                            </div>

                            <div className="p-2 navi">
                                <i className="sideIcon bi bi-plus-lg"></i>Create
                            </div>

                            <div className="navi mb-5" onClick={() => navigate('/profile')}>
                                <div className="sidebar-dp p-2">
                                    <div className="sidebar-story-ring">

                                        {/* 🔥 FIX 2 */}
                                        <img className='sidebar-profile-img' src={`${API}${user.profile_pic}`} alt="" />

                                    </div>
                                </div>
                                <span className='mx-1'>Profile</span>
                            </div>
                        </div>

                        <div className="d-flex flex-column mt-4 gap-1">
                            <div className="p-2 navi" onClick={() => setMoreOption(true)}>
                                <i className="sideIcon bi bi-list"></i>More
                            </div>

                            <div className="p-2 navi" onClick={() => setMetaOption(!metaOption)}>
                                <i className={`sideIcon bi ${metaOption ? 'bi-grid-fill' : 'bi-grid'}`}></i>
                                Also from Meta
                            </div>
                        </div>

                    </div>
                ) : (
                    <div>

                        <div className="d-flex flex-column mb-3">
                            <div className="p-2 instaIcon mt-3">
                                <img src={instaIcon} alt="Icon" />
                            </div>
                        </div>

                        <div className="d-flex flex-column mt-5 gap-1">

                            <div className="p-2 mt-4 navi">
                                <i className="sideIcon bi bi-house-door-fill"></i>
                            </div>

                            <div className="p-2 navi">
                                <i className="sideIcon bi bi-play-btn"></i>
                            </div>

                            <div className="p-2 navi">
                                <i className="sideIcon bi bi-send"></i>
                                <span className="translate-middle bg-danger msg-icon">9+</span>
                            </div>

                            <div className="p-2 navi">
                                <i className="sideIcon bi bi-search"></i>
                            </div>

                            <div className="p-2 navi">
                                <i className="sideIcon bi bi-compass"></i>
                            </div>

                            <div className="p-2 navi">
                                <i className="sideIcon bi bi-suit-heart"></i>
                            </div>

                            <div className="p-2 navi">
                                <i className="sideIcon bi bi-plus-lg"></i>
                            </div>

                            <div className="navi mb-5">
                                <div className="sidebar-dp p-2">
                                    <div className="sidebar-story-ring">

                                        {/* 🔥 FIX */}
                                        <img className='sidebar-profile-img' src={`${API}${user.profile_pic}`} alt="" />

                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className="d-flex flex-column mt-4 gap-1">
                            <div className="p-2 navi">
                                <i className="sideIcon bi bi-list"></i>
                            </div>
                            <div className="p-2 navi">
                                <i className="sideIcon bi bi-grid"></i>
                            </div>
                        </div>

                    </div>
                )}

            </div>

            {/* SWITCH ACCOUNT FIX */}
            {
                switchAcc && (
                    <div className="overlay" onClick={() => setSwitchAcc(false)}>
                        <div className="switch-optionBox" onClick={(e) => e.stopPropagation()}>

                            {/* 🔥 FIX 3 — use import or public */}
                            <img src={instaIcon} alt="Instagram" className="switch-instaName my-5" />

                            <div className="switch-login-box">

                                <div className="input-group input-group-sm mb-3">
                                    <input type="text" className="form-control" placeholder="Phone number, username, or email" />
                                </div>

                                <div className="input-group input-group-sm mb-3">
                                    <input type="text" className="form-control" placeholder="password" />
                                </div>

                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" />
                                    <label className="form-check-label">
                                        <small>Save login info</small>
                                    </label>
                                </div>

                                <button className="btn btn-primary w-100 mt-3 switch-login-btn">
                                    Log in
                                </button>

                                <div className="text-center w-100 mt-3 switch-fp">
                                    <small>Forget Password?</small>
                                </div>

                            </div>
                        </div>
                    </div>
                )
            }

        </>
    )
}

export default Sidebar