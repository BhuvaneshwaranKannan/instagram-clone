import React from 'react'
import useFetch from './useFetch';
import Post from './Post'
import API from './api';

function PostList() {

    const [list, loading] = useFetch(`${API}/posts`);

    if (loading) {
        return (
            <div className="feedLoading" role="status" aria-label="Loading posts">
                <div className="feedLoadingSpinner"></div>
            </div>
        );
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