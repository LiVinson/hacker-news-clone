import React from "react"
import { NavLink } from "react-router-dom"
import { ThemeConsumer } from "../context/theme"

const styles = {
  color: "rgb(204, 20, 20)",
  fontWeight: "bold"
}

export default function NavBar() {
  return (
    <ThemeConsumer>
      {({ theme, changeTheme }) => {
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

            <button
              style={{ fontSize: "30px" }}
              className="btn-clear"
              onClick={changeTheme}
            >
              {theme === "light" ? "🌙" : "🌞"}
            </button>
          </nav>
        )
      }}
    </ThemeConsumer>
  )
}
