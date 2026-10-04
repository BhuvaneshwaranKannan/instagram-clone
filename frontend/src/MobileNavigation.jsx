import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import instaLogo from './assets/instaLogo.png'
import useFetch from './useFetch'
import API from './api'

function MobileNavigation() {
  const location = useLocation()
  const [profiles] = useFetch(`${API}/profile`)
  const isHome = location.pathname === '/home'
  const isProfile = location.pathname === '/profile'
  const profileImage = profiles?.[0]?.user?.profile_pic

  return (
    <>
      <header className="mobile-topbar">
        
        <div className="mobile-top-actions">
          <button type="button" aria-label="Create"><i className="bi bi-plus" /></button>
        </div>
        <Link to="/home" aria-label="Instagram home" className="mobile-brand">
          <img src={instaLogo} alt="" />
          <span>Instagram</span>
        </Link>
        <div className="mobile-top-actions">
          <button type="button" aria-label="Notifications"><i className="bi bi-suit-heart" /></button>
        </div>
      </header>

      <nav className="mobile-bottom-nav" aria-label="Main navigation">
        <Link to="/home" aria-label="Home" aria-current={isHome ? 'page' : undefined}>
          <i className={`bi ${isHome ? 'bi-house-door-fill' : 'bi-house-door'}`} />
        </Link>
        <button type="button" aria-label="Reels">
          <i className="bi bi-play-btn" />
        </button>
        <button type="button" aria-label="Messages">
          <i className="bi bi-send" />
        </button>
        <button type="button" aria-label="Search">
          <i className="bi bi-search" />
        </button>
        <Link to="/profile" aria-label="Profile" aria-current={isProfile ? 'page' : undefined}>
          {profileImage ? (
            <img className="mobile-profile-img" src={`${API}${profileImage}`} alt="" />
          ) : (
            <i className={`bi ${isProfile ? 'bi-person-circle' : 'bi-person'}`} />
          )}
        </Link>
      </nav>
    </>
  )
}

export default MobileNavigation