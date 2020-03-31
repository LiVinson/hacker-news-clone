import React from "react"
import { Link } from "react-router-dom"

export default function NavBar() {
  return (
    <div className="navbar">
      <Link to="/">Top</Link>
      <Link to="/new">New</Link>
    </div>
  )
}
