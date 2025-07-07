import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function PostList() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get('/api/posts')
        setPosts(res.data)
      } catch (err) {
        console.error('Error fetching posts:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  if (loading) return <p className="text-center">Loading posts...</p>

  if (posts.length === 0) return <p className="text-center">No posts found.</p>

  return (
    <div className="space-y-4">
      {posts.map(post => (
        <div key={post._id} className="border p-4 rounded shadow">
          <h2 className="text-xl font-semibold">{post.title}</h2>
          <p className="text-sm text-gray-600">{post.category?.name || 'No Category'}</p>
          <p className="mt-2">{post.content.slice(0, 100)}...</p>
          <Link to={`/posts/${post._id}`} className="text-blue-500 underline mt-2 inline-block">Read more</Link>
        </div>
      ))}
    </div>
  )
}
