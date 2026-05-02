import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import API from './api'; // ✅ NEW

function Post(props) {

  const navigate = useNavigate();

  const [option, setOption] = useState(false);
  const [save, setSave] = useState(false);
  const [like, setLike] = useState(false);
  const [commentBox, setCommentBox] = useState(false);

  const [follow, setFollow] = useState(false);
  const [unfollowBox, setUnfollowBox] = useState(false);

  useEffect(() => {
    if (save) {
      const timer = setTimeout(() => {
        setSave(false);
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [save]);

  return (
    <>
      <div className='my-3'>
        <div className="card" style={{ width: "29.5rem" }}>

          {/* HEADER */}
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">

              <div className="story-ring mx-2" onClick={() => navigate(`/stories/${props.id}`)}>
                {/* 🔥 FIX */}
                <img className='profile-img' src={`${API}${props.dp}`} alt="" />
              </div>

              <div className="d-flex flex-column">
                <div className="d-flex align-items-center gap-1">
                  <h6 className='mb-0 postName'>{props.name}</h6>
                  <span>•
                    <small className='postTime p-1'>6h</small>
                  </span>
                </div>
                <small>{props.place}</small>
              </div>

            </div>

            <div className="d-flex align-items-center gap-3 me-2">
              {
                follow ? (
                  <span className="postFollow" onClick={() => setUnfollowBox(true)}>Following</span>
                ) : (
                  <span className="postFollow" onClick={() => setFollow(true)}>Follow</span>
                )
              }

              <i className="bi bi-three-dots optionBtn"
                onClick={() => setOption(true)}
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="option"
              ></i>
            </div>
          </div>

          {/* POST IMAGE */}
          <div className="postImage my-2">
            {/* 🔥 FIX */}
            <img src={`${API}${props.image}`} alt="" />

            {
              save && (
                <div className="afterSave">
                  Your item has been saved.
                  <span>View your saved posts</span>
                </div>
              )
            }
          </div>

          {/* ACTIONS */}
          <div className="d-flex align-items-center justify-content-between">
            <div className="reaction d-flex align-items-center">

              <div className="p-like d-flex flex-row align-items-center mx-1">
                {
                  like ? (
                    <i className="reactIcon bi bi-suit-heart-fill text-danger m-1"
                      onClick={() => setLike(false)}></i>
                  ) : (
                    <i className="reactIcon bi bi-suit-heart m-1"
                      onClick={() => setLike(true)}></i>
                  )
                }
                <span>{props.likes}</span>
              </div>

              <div className="p-comments d-flex flex-row align-items-center mx-1"
                onClick={() => setCommentBox(true)}>
                <i className="reactIcon bi bi-chat m-1"></i>
                {props.comments}
              </div>

              <div className="p-repost d-flex flex-row align-items-center mx-1">
                <i className="reactIcon bi bi-arrow-repeat m-1"></i>
                {props.repost}
              </div>

              <div className="p-share d-flex flex-row align-items-center mx-1">
                <i className="reactIcon bi bi-send m-1"></i>
                {props.share}
              </div>

            </div>

            <div>
              {
                save ? (
                  <i className="reactIcon pSave bi bi-bookmark-fill mx-2"
                    onClick={() => setSave(false)}></i>
                ) : (
                  <i className="reactIcon pSave bi bi-bookmark mx-2"
                    onClick={() => setSave(true)}></i>
                )
              }
            </div>
          </div>

          {/* CAPTION */}
          <div>
            <p className='mx-2'>
              {props.name}
              <small>
                <span>
                  {props.caption}
                  ...<small className='captionMore text-muted'><span>more</span></small>
                </span>
              </small>
            </p>
          </div>

        </div>
      </div>

      {/* UNFOLLOW BOX */}
      {
        unfollowBox && (
          <div className="overlay" onClick={() => setUnfollowBox(false)}>
            <div className="f-optionBox" onClick={(e) => e.stopPropagation()}>
              <div className="f-optionItem unfollowQ">

                <div className="f-story-ring my-3">
                  {/* 🔥 FIX */}
                  <img className='profile-img' src={`${API}${props.dp}`} alt="" />
                </div>

                <div className="f-unfollowQuote mb-2">
                  Unfollow @{props.name}?
                </div>
              </div>

              <div className="f-optionItem option-unfollow"
                onClick={() => { setFollow(false); setUnfollowBox(false); }}>
                Unfollow
              </div>

              <div className="f-optionItem"
                onClick={() => setUnfollowBox(false)}>
                Cancel
              </div>
            </div>
          </div>
        )
      }

    </>
  )
}

export default Post