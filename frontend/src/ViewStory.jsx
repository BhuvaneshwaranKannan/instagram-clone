import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "./api"; 

const STORY_DURATION = 5000;
const TICK_MS = 50;

export default function ViewStory() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [allStories, setAllStories] = useState([]);
  const [userIndex, setUserIndex] = useState(0);
  const [storyIndex, setStoryIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const intervalRef = useRef(null);
  const touchStartX = useRef(null);
  const touchStartTime = useRef(null);

  useEffect(() => {
    fetch(`${API}/stories`)
      .then((r) => r.json())
      .then((data) => {
        setAllStories(data || []);
        const idx = (data || []).findIndex(
          (u) => String(u.id) === String(id)
        );
        setUserIndex(idx >= 0 ? idx : 0);
        setStoryIndex(0);
        setProgress(0);
      })
      .catch(console.error);
  }, [id]);

  const currentUser = allStories[userIndex];
  const stories = currentUser?.stories || [];
  const currentStory = stories[storyIndex];

  useEffect(() => {
    if (!currentUser) return;

    let nextImg = null;

    if (storyIndex < stories.length - 1) {
      nextImg = stories[storyIndex + 1]?.image;
    } else if (userIndex < allStories.length - 1) {
      nextImg = allStories[userIndex + 1]?.stories?.[0]?.image;
    }

    if (nextImg) {
      const img = new Image();
      img.src = `${API}${nextImg}`; // 🔥 FIX
    }
  }, [userIndex, storyIndex, allStories, currentUser, stories]);

  const clearTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const goNext = () => {
    setProgress(0);

    if (storyIndex < stories.length - 1) {
      setStoryIndex((i) => i + 1);
      return;
    }

    if (userIndex < allStories.length - 1) {
      setUserIndex((u) => u + 1);
      setStoryIndex(0);
      return;
    }

    navigate("/home");
  };

  const goPrev = () => {
    setProgress(0);

    if (storyIndex > 0) {
      setStoryIndex((i) => i - 1);
      return;
    }

    if (userIndex > 0) {
      const prevUser = allStories[userIndex - 1];
      const lastIdx = (prevUser?.stories?.length || 1) - 1;

      setUserIndex((u) => u - 1);
      setStoryIndex(Math.max(0, lastIdx));
      return;
    }

    navigate("/home");
  };

  useEffect(() => {
    clearTimer();

    if (!currentStory || isPaused) return;

    intervalRef.current = setInterval(() => {
      setProgress((p) => {
        const step = 100 / (STORY_DURATION / TICK_MS);

        if (p + step >= 100) {
          goNext();
          return 0;
        }

        return p + step;
      });
    }, TICK_MS);

    return clearTimer;
  }, [userIndex, storyIndex, isPaused, currentStory]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "Escape") navigate("/home");
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [userIndex, storyIndex, allStories]);

  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartTime.current = Date.now();
    setIsPaused(true);
  };

  const onTouchEnd = (e) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dt = Date.now() - touchStartTime.current;

    setIsPaused(false);

    if (dt < 200 && Math.abs(dx) < 10) return;

    if (dx > 50) goPrev();
    else if (dx < -50) goNext();
  };

  const holdStart = () => setIsPaused(true);
  const holdEnd = () => setIsPaused(false);

  if (!currentUser || !currentStory) {
    return (
      <div className="sv-overlay">
        <div className="sv-loading">Loading…</div>
      </div>
    );
  }

  const timeAgo = currentStory.time || "just now";

  return (
    <div className="sv-overlay">
      <div
        className="sv-card"
        onMouseDown={holdStart}
        onMouseUp={holdEnd}
        onMouseLeave={holdEnd}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <img
          src={`${API}${currentStory.image}`}
          alt="story"
          className="sv-img"
        />

        <div className="sv-gradient-top" />
        <div className="sv-gradient-bottom" />

        <div className="sv-progress-row">
          {stories.map((_, i) => (
            <div key={i} className="sv-progress-track">
              <div
                className="sv-progress-fill"
                style={{
                  width:
                    i < storyIndex
                      ? "100%"
                      : i === storyIndex
                      ? `${progress}%`
                      : "0%",
                }}
              />
            </div>
          ))}
        </div>

        <div className="sv-header">
          <div className="sv-user-info">
            <div className="sv-avatar-ring">

              <img
                src={`${API}${currentUser.user.profile_pic}`}
                alt={currentUser.user.username}
                className="sv-avatar"
              />

            </div>

            <div className="sv-meta">
              <span className="sv-username">
                {currentUser.user.username}
              </span>
              <span className="sv-time">{timeAgo}</span>
            </div>
          </div>

          {isPaused && <span className="sv-paused-dot" />}

          <button
            className="sv-close-btn"
            onClick={() => navigate("/home")}
          >
            ✕
          </button>
        </div>

        {!(userIndex === 0 && storyIndex === 0) && (
          <div className="sv-nav sv-nav-left" onClick={goPrev} />
        )}
        <div className="sv-nav sv-nav-right" onClick={goNext} />
      </div>

      {!(userIndex === 0 && storyIndex === 0) && (
        <button className="sv-side-btn sv-side-prev" onClick={goPrev}>
          ‹
        </button>
      )}
      <button className="sv-side-btn sv-side-next" onClick={goNext}>
        ›
      </button>
    </div>
  );
}