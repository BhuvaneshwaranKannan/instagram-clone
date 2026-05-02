import React, { useState } from 'react'
import Sidebar from './Sidebar'
import useFetch from './useFetch';
import { useNavigate } from 'react-router-dom';
import HighlightsList from './HighlightsList';
import ProfilePost from './ProfilePost';
import Messages from './Messages';
import API from './api'; // ✅ NEW

function Profile() {

    // ✅ FIX 1 — use API
    const [list] = useFetch(`${API}/profile`);

    const [profileSettings, setProfileSettings] = useState(false);
    const navigate = useNavigate();

    if (!list || list.length === 0) {
        return <div>Loading...</div>;
    }

    const user = list[0].user;

    return (
        <>
            <div className='d-flex vh-100'>
                <div className='w-14'> <Sidebar /> </div>

                <div className='w-72'>

                    {/* PROFILE HEADER */}
                    <div className="d-flex align-items-center justify-content-center mt-5">
                        <div className="profile-dp mx-4">

                            {/* 🔥 FIX 2 */}
                            <img className='profile-dp-img' src={`${API}${user.profile_pic}`} alt="" />

                        </div>

                        <div className="d-flex flex-column">
                            <div className="d-flex align-items-center gap-1">
                                <div className='profile-username'>{user.username}</div>

                                {/* 🔥 FIX 3 */}
                                <div className="profile-settings ms-1" onClick={() => setProfileSettings(true)}>
                                    <i className="bi bi-gear-wide"></i>
                                </div>
                            </div>

                            <div className='profile-nickname mt-2'>
                                {user.nickname}
                            </div>

                            <div className='mt-2'>
                                <span className='me-3'>
                                    <span className='profile-numbers'>{user.post}</span>
                                    <small> posts</small>
                                </span>

                                <span className='me-3'>
                                    <span className='profile-numbers'>{user.followers}</span>
                                    <small> followers</small>
                                </span>

                                <span className='me-3'>
                                    <span className='profile-numbers'>{user.following}</span>
                                    <small> following</small>
                                </span>
                            </div>

                            <div className='mt-3'>
                                Jack of all Trades, King of None, but oftentimes ...
                            </div>

                        </div>
                    </div>

                    {/* BUTTONS */}
                    <div className="twobuttons">
                        <div className="d-flex flex-row justify-content-center mt-4 gap-2">
                            <div className="profile-button">Edit profile</div>
                            <div className="profile-button">View archive</div>
                        </div>
                    </div>

                    {/* HIGHLIGHTS */}
                    <div>
                        <HighlightsList />
                    </div>

                    {/* ICONS */}
                    <div className='mt-4 profile-grid-selectors'>
                        <i className="bi bi-grid-3x3-gap-fill profile-icons"></i>
                        <i className="bi bi-play-btn profile-icons"></i>
                        <i className="bi bi-bookmark profile-icons"></i>
                        <i className="bi bi-arrow-repeat profile-icons"></i>
                        <i className="bi bi-person-square profile-icons"></i>
                    </div>

                    <div className="iconBaseLine"></div>

                    {/* POSTS GRID */}
                    <div className="postGrid">
                        {list.map((st) =>
                            st.profilePosts.map((hl) => (
                                <ProfilePost
                                    key={hl.profile_post_id}
                                    id={hl.profile_post_id}
                                    image={`${API}${hl.profile_post}`}

                                    comment={hl.profile_post_comment}
                                    like={hl.profile_post_like}
                                />
                            ))
                        )}
                    </div>

                    {/* FOOTER */}
                    <div className='credits'>
                        <span className="nav-item">Meta</span>
                        <span className="nav-item">About</span>
                        <span className="nav-item">Blog</span>
                        <span className="nav-item">Jobs</span>
                        <span className="nav-item">Help</span>
                        <span className="nav-item">API</span>
                        <span className="nav-item">Privacy</span>
                        <span className="nav-item">Terms</span>
                        <span className="nav-item">Locations</span>
                        <span className="nav-item">Popular</span>
                        <span className="nav-item">Instagram Lite</span>
                        <span className="nav-item">Meta AI</span>
                        <span className="nav-item">Threads</span>
                        <span className="nav-item">Contact Uploading & Non Users</span>
                        <span className="nav-item">Meta Verified</span>
                    </div>

                    <div className="second-line">
                        <span>English ▼</span>
                        <span>© 2026 Instagram from Vishi</span>
                    </div>

                </div>

                <div className='w-14'></div>

                <div><Messages /></div>

            </div>

            {/* SETTINGS POPUP */}
            {
                profileSettings && (
                    <div className="overlay" onClick={() => setProfileSettings(false)}>
                        <div className="profile-setting-Box" onClick={(e) => e.stopPropagation()}>
                            <div className="optionItem">Apps and websites</div>
                            <div className="optionItem">QR Code</div>
                            <div className="optionItem">Notifications</div>
                            <div className="optionItem">Settings and privacy</div>
                            <div className="optionItem">Meta Verified</div>
                            <div className="optionItem">Supervision</div>
                            <div className="optionItem">Login activity</div>
                            <div className="optionItem" onClick={() => navigate('/')}>Logout</div>
                            <div className="optionItem cancel" onClick={() => setProfileSettings(false)}>Cancel</div>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default Profile