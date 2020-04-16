import React from "react"
import { NavLink } from "react-router-dom"

export default function NotFound({ theme, url, alt text }) {
  return (
    <div>
      <h1>Oh No!</h1>
      <div className="row space-around">
        <img id="notFoundImage" src={url} alt={alt} />
        <div>
          <p id="notFoundText">
          { text}
          </p>
          <NavLink to="/">
            <button id="notFoundBtn">HomePage</button>
          </NavLink>
        </div>
      </div>
    </div>
  )
}
