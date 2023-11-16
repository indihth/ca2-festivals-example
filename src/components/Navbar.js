import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = ({ authenticated, onAuthenticated}) => {

  const navigate = useNavigate();

  const logout = () => {
    onAuthenticated(false)    // Logout
    navigate("/")             // Go to homepage
  }

  return (
    <>
        <Link to="/">Home</Link> |
        <Link to="/festivals">All Festivals</Link>
        {/* Anonomous arrow function for onClick, cannot use onClick={onAuthenticated(false)} 
        - alternative create handleClick which calls onAuthenticated(false)*/}
        {(authenticated) ? <button onClick={logout}>Logout</button> : ""}
    </>
  )
}

export default Navbar