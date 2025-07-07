import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'

export default function SinglePost() {
  const { id } = useParams()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`/api/posts/${id}`)
        setPost(res.data)
      } catch (err) {
        setError('Post not found or server error.')
      } finally {
        setLoading(false)
      }
    }
    fetchPost()
  }, [id])

  if (loading) return <p className="text-center mt-6">Loading post...</p>
  if (error) return <p className="text-center mt-6 text-red-500">{error}</p>

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
      <p className="text-sm text-gray-500 mb-4">
        Category: {post.category?.name || 'Uncategorized'}
      </p>
      <p className="text-base">{post.content}</p>

      <Link to="/" className="text-blue-600 underline mt-4 inline-block">
        ← Back to posts
      </Link>
    </div>
  )
}

