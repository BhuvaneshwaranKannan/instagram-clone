import React, { useRef, useState, useEffect } from 'react'
import useFetch from './useFetch'
import Story from './Story';
import API from './api'; // ✅ NEW

function StoryList() {

    // ✅ FIX 1 — API
    const [list] = useFetch(`${API}/stories`);

    const storyRef = useRef();

    const [showLeft, setShowLeft] = useState(false);
    const [showRight, setShowRight] = useState(true);

    const scroll = (direction) => {
        const container = storyRef.current;
        const scrollAmount = container.clientWidth;

        container.scrollBy({
            left: direction * scrollAmount,
            behavior: "smooth"
        });
    };

    const checkScroll = () => {
        const container = storyRef.current;

        const scrollLeft = container.scrollLeft;
        const maxScroll = container.scrollWidth - container.clientWidth;

        setShowLeft(scrollLeft > 0);
        setShowRight(scrollLeft < maxScroll);
    };

    useEffect(() => {
        if (list?.length) checkScroll(); // ✅ safe
    }, [list]);

    return (
        <div className="stories-wrapper position-relative">

            {showLeft && (
                <button className="scroll-btn left" onClick={() => scroll(-1)}>
                    <i className="bi bi-chevron-left"></i>
                </button>
            )}

            <div
                className="stories-container d-flex"
                ref={storyRef}
                onScroll={checkScroll}
            >
                {/* ✅ FIX 2 — safe map */}
                {list?.map((st) => (
                    <Story
                        key={st.id}
                        id={st.id}
                        name={st.user.username}
                        dp={st.user.profile_pic} // ✅ handled inside Story.jsx
                    />
                ))}
            </div>

            {showRight && (
                <button className="scroll-btn right" onClick={() => scroll(1)}>
                    <i className="bi bi-chevron-right"></i>
                </button>
            )}

        </div>
    )
}

export default StoryList;