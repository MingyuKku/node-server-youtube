import React from 'react'
import { Link } from 'react-router-dom';

// MUI



const LeftMenu = () => {
  return (
    <div>
      <Link to="/" style={{
        'marginRight': '20px'
      }}>
        Home
      </Link>
      <Link to="/about" style={{
        'marginRight': '20px'
      }}>
        Blog
      </Link>
      <Link to="/video/upload">
        Upload Video
      </Link>
    </div>
  )
}

export default LeftMenu;