import express from 'express'
import {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost
} from '../controllers/postController.js'
import { body } from 'express-validator'
import validateRequest from '../middleware/validateRequest.js'

const router = express.Router()

// GET all posts
router.get('/', getPosts)

// GET single post by ID
router.get('/:id', getPostById)

// CREATE new post
router.post(
  '/',
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('content').notEmpty().withMessage('Content is required'),
    body('category').notEmpty().withMessage('Category is required'),
    validateRequest
  ],
  createPost
)

// UPDATE post
router.put(
  '/:id',
  [
    body('title').optional().notEmpty().withMessage('Title cannot be empty'),
    body('content').optional().notEmpty().withMessage('Content cannot be empty'),
    body('category').optional().notEmpty().withMessage('Category cannot be empty'),
    validateRequest
  ],
  updatePost
)

// DELETE post
router.delete('/:id', deletePost)

export default router

