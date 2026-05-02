import React, { useEffect } from 'react';
import useFetch from './useFetch';
import API from './api'; // ✅ NEW

function Messages() {

  // ✅ FIX 1 — use API
  const [list] = useFetch(`${API}/messages`);

  useEffect(() => {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    tooltipTriggerList.forEach(el => new window.bootstrap.Tooltip(el));
  }, []);

  // ✅ FIX 2 — safe loading
  if (!list || list.length < 3) {
    return <div>Loading...</div>;
  }

  const user1 = list[0];
  const user2 = list[1];
  const user3 = list[2];

  return (
    <>
      <div className="position-fixed bottom-0 end-0 m-4">

        <div className="message-pill d-flex align-items-center px-3 py-2 rounded-pill bg-dark text-white shadow-lg">

          {/* Icon + badge */}
          <div className="position-relative me-2">
            <i className="bi bi-send fs-4"></i>
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger small-badge">
              9+
            </span>
          </div>

          <span className="fw-medium ms-2 fs-6 mx-3">Messages</span>

          <div className="d-flex align-items-center avatar-group">

            {/* 🔥 FIX 3 — image prefix */}
            <img
              src={`${API}${user1.user_1.profile_pic}`}
              className="avatar"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title={user1.user_1.nickname}
              alt=""
            />

            <img
              src={`${API}${user2.user_2.profile_pic}`}
              className="avatar"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title={user2.user_2.nickname}
              alt=""
            />

            <img
              src={`${API}${user3.user_3.profile_pic}`}
              className="avatar"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title={user3.user_3.nickname}
              alt=""
            />

            <div
              className="avatar more"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="more"
            >
              ...
            </div>

          </div>

        </div>

      </div>
    </>
  );
}

export default Messages;