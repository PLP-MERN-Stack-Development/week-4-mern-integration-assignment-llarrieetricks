import Post from '../models/Post.js'

// Get all posts
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('category')
    res.json(posts)
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch posts', error })
  }
}

// Get post by ID
export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('category')
    if (!post) return res.status(404).json({ message: 'Post not found' })
    res.json(post)
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch post', error })
  }
}

// Create a post
export const createPost = async (req, res) => {
  try {
    const { title, content, category } = req.body
    const post = new Post({ title, content, category })
    await post.save()
    res.status(201).json(post)
  } catch (error) {
    res.status(400).json({ message: 'Failed to create post', error })
  }
}

// Update a post
export const updatePost = async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    })
    if (!updatedPost) return res.status(404).json({ message: 'Post not found' })
    res.json(updatedPost)
  } catch (error) {
    res.status(400).json({ message: 'Failed to update post', error })
  }
}

// Delete a post
export const deletePost = async (req, res) => {
  try {
    const deleted = await Post.findByIdAndDelete(req.params.id)
    if (!deleted) return res.status(404).json({ message: 'Post not found' })
    res.json({ message: 'Post deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete post', error })
  }
}
