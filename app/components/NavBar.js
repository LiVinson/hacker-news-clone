import React from "react"
import { NavLink } from "react-router-dom"

const styles = {
  color: "rgb(204, 20, 20)",
  fontWeight: "bold"
}
export default function NavBar(props) {
  return (
    <nav className="navbar row space-around">
      <ul className="row">
        <li className="list-item">
          <NavLink exact to="/" activeStyle={styles}>
            Top
          </NavLink>
        </li>
        <li className="list-item">
          <NavLink to="/new" activeStyle={styles}>
            New
          </NavLink>
        </li>
      </ul>
      <button style={{ fontSize: "30px" }} className="btn-clear">
        🌞
      </button>
    </nav>
  )
}
