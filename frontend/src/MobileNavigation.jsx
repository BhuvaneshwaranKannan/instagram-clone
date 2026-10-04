import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import instaLogo from './assets/instaLogo.png'

function MobileNavigation() {
  const location = useLocation()
  const isHome = location.pathname === '/home'
  const isProfile = location.pathname === '/profile'

  return (
    <>
      <header className="mobile-topbar">
        <Link to="/home" aria-label="Instagram home" className="mobile-brand">
          <img src={instaLogo} alt="" />
          <span>Instagram</span>
        </Link>
        <div className="mobile-top-actions">
          <button type="button" aria-label="Notifications"><i className="bi bi-suit-heart" /></button>
          <button type="button" aria-label="Messages"><i className="bi bi-send" /></button>
        </div>
      </header>

      <nav className="mobile-bottom-nav" aria-label="Main navigation">
        <Link to="/home" aria-label="Home" aria-current={isHome ? 'page' : undefined}>
          <i className={`bi ${isHome ? 'bi-house-door-fill' : 'bi-house-door'}`} />
        </Link>
        <button type="button" aria-label="Search">
          <i className="bi bi-search" />
        </button>
        <button type="button" aria-label="Create">
          <i className="bi bi-plus" />
        </button>
        <button type="button" aria-label="Reels">
          <i className="bi bi-play-btn" />
        </button>
        <Link to="/profile" aria-label="Profile" aria-current={isProfile ? 'page' : undefined}>
          {/* <i className={`bi ${isProfile ? 'bi-person-circle' : 'bi-person'}`} /> */}
          <img className='sidebar-profile-img' src={`${API}${user.profile_pic}`} alt="" />
        </Link>
      </nav>
    </>
  )
}

export default MobileNavigation