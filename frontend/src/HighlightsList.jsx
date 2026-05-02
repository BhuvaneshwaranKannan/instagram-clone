import React, { useRef, useState, useEffect } from 'react';
import useFetch from './useFetch';
import Highlights from './Highlights';
import plusIcon from './assets/plus_icon.jpg';
import API from './api'; 

function HighlightsList() {

    const [list] = useFetch(`${API}/profile`);

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
        if (list.length) checkScroll(); 
    }, [list]);

    return (
        <div className="stories-wrapper position-relative">

            {showLeft && (
                <button className="scroll-btn hl-left" onClick={() => scroll(-1)}>
                    <i className="bi bi-chevron-left"></i>
                </button>
            )}

            <div
                className="stories-container d-flex"
                ref={storyRef}
                onScroll={checkScroll}
            >
                {list?.map((st) =>
                    st.highlights.map((hl) => (
                        <Highlights
                            key={hl.highlights_id}
                            id={st.id}
                            name={hl.highlights_name}
                            dp={`${API}${hl.highlights_dp}`} // 🔥 IMPORTANT
                        />
                    ))
                )}

                <div className="highlight d-flex flex-column align-items-center mx-2">
                    <div className="highlight-dp-ring">
                        <img className="profile-img" src={plusIcon} alt="+" />
                    </div>

                    <div className="text-center" style={{ width: "80px" }}>
                        <small>New</small>
                    </div>
                </div>
            </div>

            {showRight && (
                <button className="scroll-btn hl-right" onClick={() => scroll(1)}>
                    <i className="bi bi-chevron-right"></i>
                </button>
            )}

        </div>
    );
}

export default HighlightsList;