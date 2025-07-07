import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import PostList from './components/PostList.jsx'
import PostForm from './components/PostForm.jsx'
import './index.css'

const Home = () => <PostList />
const ViewPost = () => <h2 className="text-xl mt-10 text-center">Single Post Page</h2>

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="posts/new" element={<PostForm />} />
        <Route path="posts/:id" element={<ViewPost />} />
      </Route>
    </Routes>
  </BrowserRouter>
)
