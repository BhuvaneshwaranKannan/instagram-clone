import React, { useState } from 'react'
import useFetch from './useFetch';
import API from './api';
import instaIcon from './assets/instaIcon.png';
import { useNavigate } from 'react-router-dom';

function SuggestionProfile() {

  const navigate = useNavigate();

  const [list] = useFetch(`${API}/profile`);

  const [switchAcc, setSwitchAcc] = useState(false);

  if (!list || list.length === 0) {
    return <div></div>;
  }

  const user = list[0].user;

  return (
    <>
      <div className="d-flex align-items-center justify-content-between mb-1">

        <div className="d-flex align-items-center mx-2">

          <div className="suggest-dp mx-2" onClick={()=>navigate('/profile')}>

            <img 
              className='profile-img' 
              src={`${API}${user.profile_pic}`} 
              alt="" 
            />

          </div>

          <div className="d-flex flex-column">
            <div className="d-flex align-items-center gap-1"  onClick={()=>navigate('/profile')}>
              <h6 className='mb-0'>{user.username}</h6>
            </div>
            <small className='grey-color'>{user.nickname}</small>
          </div>

        </div>

        <div className="d-flex align-items-center gap-3 me-2">
          <span 
            className="switch text-primary" 
            onClick={() => setSwitchAcc(true)}
          >
            Switch
          </span>
        </div>

        {
          switchAcc && (
            <div className="overlay" onClick={() => setSwitchAcc(false)}>
              <div className="switch-optionBox" onClick={(e) => e.stopPropagation()}>

                <img src={instaIcon} alt="Instagram" className="switch-instaName my-5" />

                <div className="switch-login-box">
                  <div class="input-group input-group-sm mb-3">
                    <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" placeholder="Phone number, username, or email" />
                  </div>
                  <div class="input-group input-group-sm mb-3">
                    <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" placeholder="password" />
                  </div>

                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="invalidCheck" required />
                    <label class="form-check-label">
                      <small>
                        Save login info
                      </small>
                    </label>
                  </div>

                  <button className="btn btn-primary w-100 mt-3 switch-login-btn">
                    Log in
                  </button>

                  <div className="text-center w-100 mt-3 switch-fp ">
                    <small>
                      Forget Password?
                    </small>
                  </div>
                </div>
              </div>
            </div>
          )
        }

      </div>
    </>
  )
}

export default SuggestionProfile