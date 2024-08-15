import React from 'react'
import { Link } from 'react-router-dom'

function Notfound() {
  return (
    <div>
        <h1>Not Found Page 404</h1>
        <Link to={'/login'}><button>Back to home</button></Link>
    </div>
  )
}

export default Notfound