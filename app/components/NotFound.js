import React from "react"
import { NavLink } from "react-router-dom"
import Image from "../images/notfound_dog.jpg"
import LinkButton from "./LinkButton"

export default function NotFound({ theme, alt, text }) {
  console.log(theme)
  return (
    <div>
      <h1 className={theme === "dark" ? "light-gray-text" : "none"}>Oh No!</h1>
      <div className="row space-around not-found-container">
        <img id="notFoundImage" src={Image} alt={alt} />
        <div className={theme === "dark" ? "light-gray-text" : "none"}>
          <p id="notFoundText">{text}</p>
          <div style={{ textAlign: "center" }}>
            <LinkButton
              className={`notFoundBtn ${theme === "dark" ? "dark-bg" : ""}`}
              to="/"
            >
              Go Back Home
            </LinkButton>
          </div>
        </div>
      </div>
    </div>
  )
}
