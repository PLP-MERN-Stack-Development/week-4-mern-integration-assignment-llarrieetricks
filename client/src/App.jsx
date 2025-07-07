import { Outlet, Link } from 'react-router-dom'

const App = () => {
  return (
    <div className="p-4">
      <nav className="flex space-x-4 mb-6">
        <Link to="/">Home</Link>
        <Link to="/posts/new">New Post</Link>
      </nav>
      <Outlet />
    </div>
  )
}

export default App
