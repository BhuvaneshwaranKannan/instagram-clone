import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './Login'
import Home from './Home'
import Post from './Post'
import PostList from './PostList'
import ViewStory from './ViewStory'
import Profile from './Profile'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />
  },
  {
    path: '/home',
    element: <Home />
  },
  {
    path: '/stories/:id',
    element: <ViewStory />
  },
  {
    path: '/profile',
    element: <Profile />
  }
]);

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App

// npx json-server --watch db/db.json --port 3000 --static ./db   