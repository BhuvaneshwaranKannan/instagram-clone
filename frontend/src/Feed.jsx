import React from 'react'
import PostList from './PostList'
import StoryList from './StoryList'

function Feed() {
  return (
    <>
      <div className='stories d-flex justify-content-center'>
        <StoryList />
      </div>

      <div className='postList my-4'>
        <PostList />
      </div>
    </>
  )
}

export default Feed
