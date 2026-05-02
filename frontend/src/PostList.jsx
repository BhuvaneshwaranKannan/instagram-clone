import React from 'react'
import useFetch from './useFetch';
import Post from './Post'
import API from './api'; // ✅ NEW

function PostList() {

    // ✅ FIX 1 — use API
    const [list] = useFetch(`${API}/posts`);

    // ✅ FIX 2 — safe loading
    if (!list || list.length === 0) {
        return <div>Loading...</div>;
    }

    const listOfPosts = list.map((p) => (
        <Post
            key={p.id}
            id={p.id}
            name={p.user.username}
            dp={p.user.profile_pic}
            place={p.place}
            image={p.image}
            likes={p.likes}

            // ✅ FIX 3 — safe comments
            comments={p.comments ? p.comments.length : 0}

            repost={p.repost}
            share={p.share}
            caption={p.caption}
        />
    ));

    return (
        <div>
            {listOfPosts}
        </div>
    )
}

export default PostList;