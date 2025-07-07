import { useState } from 'react'
import axios from 'axios'
import useCategories from '../hooks/useCategories'

const PostForm = () => {
  const { categories, loading, error } = useCategories()

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: ''
  })

  const [success, setSuccess] = useState(false)
  const [submitError, setSubmitError] = useState(null)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitError(null)
    setSuccess(false)

    try {
      await axios.post('/api/posts', formData)
      setSuccess(true)
      setFormData({ title: '', content: '', category: '' })
    } catch (err) {
      setSubmitError(err.response?.data?.message || err.message)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-semibold mb-4">Create a New Post</h2>

      {success && <p className="text-green-600 mb-2">✅ Post created successfully!</p>}
      {submitError && <p className="text-red-600 mb-2">❌ {submitError}</p>}

      <label className="block text-sm font-medium mb-1">Title</label>
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        required
        className="w-full border rounded p-2 mb-4"
      />

      <label className="block text-sm font-medium mb-1">Content</label>
      <textarea
        name="content"
        value={formData.content}
        onChange={handleChange}
        required
        rows="4"
        className="w-full border rounded p-2 mb-4"
      />

      <label className="block text-sm font-medium mb-1">Select category</label>
      <select
        name="category"
        value={formData.category}
        onChange={handleChange}
        required
        className="w-full border rounded p-2 mb-4"
      >
        {loading && <option>Loading...</option>}
        {error && <option disabled>Error loading categories</option>}
        {!loading && !error && (
          <>
            <option value="">-- Select Category --</option>
            {categories.map(cat => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </>
        )}
      </select>

      <button
        type="submit"
        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        Submit
      </button>
    </form>
  )
}

export default PostForm

