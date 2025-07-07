import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'

import postRoutes from './routes/postRoutes.js'
import categoryRoutes from './routes/categoryRoutes.js' // ✅ Category route imported

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())

// API Routes
app.use('/api/posts', postRoutes)
app.use('/api/categories', categoryRoutes)

// Root route
app.get('/', (req, res) => {
  res.send('Hello from the MERN Blog API!')
})

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB')
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`)
    })
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err)
  })
