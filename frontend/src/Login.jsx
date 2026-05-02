import logo from '../db/assets/instaLogo.png'
import img from '../db/assets/xx.webp'
import meta from '../db/assets/meta-logo.png'
import fb from '../db/assets/fb.png'
import { useNavigate } from 'react-router-dom'

function Login() {

    const navigate = useNavigate();

    return (
        <>
            <div className='mainC'>
                <div className="container-fluid">
                    <div className="row">

                        {/* LEFT SIDE */}
                        <div className="col-7 d-flex flex-column justify-content-center align-items-center left-section">
                            <div className='logo'>
                                <img src={logo} alt="logo" />
                            </div>

                            <div className="quote">
                                <h1>See everyday moments from your</h1>
                                <h1 className='colorQuote'>
                                    close friends<span style={{ color: "#ccc" }}>.</span>
                                </h1>
                            </div>

                            <div className="image">
                                <img src={img} alt="" />
                            </div>
                        </div>

                        {/* RIGHT SIDE */}
                        <div className="col-5 d-flex justify-content-center align-items-center right-section">
                            <div className="login-box">
                                <h4>Log into Instagram</h4>

                                <div className="text-center">

                                    <div className="form-floating mb-3">
                                        <input 
                                            type="email" 
                                            className="form-control" 
                                            id="floatingInput" 
                                            placeholder="name@example.com" 
                                        />
                                        <label htmlFor="floatingInput">Email address</label>
                                    </div>

                                    <div className="form-floating mb-3">
                                        <input 
                                            type="password" 
                                            className="form-control" 
                                            id="floatingPassword" 
                                            placeholder="Password" 
                                        />
                                        {/* ✅ FIXED */}
                                        <label htmlFor="floatingPassword">Password</label>
                                    </div>

                                    <button 
                                        className="btn btn-primary w-100 mb-3 custom-btn" 
                                        onClick={() => navigate('/home')}
                                    >
                                        Log in
                                    </button>

                                    <button className="btn btn-dark w-100 mb-2 custom-btn">
                                        Forget Password?
                                    </button>

                                    <button className="btn btn-dark w-100 mt-5 custom-btn">
                                        <span className='fb'>
                                            <img src={fb} alt="" />
                                        </span>
                                        Log in with Facebook
                                    </button>

                                    <button className="btn btn-outline-primary w-100 mt-2 custom-btn">
                                        Create new account
                                    </button>

                                    <img className='metaLogo' src={meta} alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="footer-line"></div>

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
        </>
    );
}

export default Login;