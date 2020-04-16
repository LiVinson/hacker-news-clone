import React from "react"
import { NavLink } from "react-router-dom"

export default function NotFound({ theme }) {
  return (
    <div>
      <h1>Oh No!</h1>
      <div className="row space-around">
        <img id="notFoundImage" src="./images/404_dog.jpg" alt="Sad dog" />
        <div>
          <p id="notFoundText">
            We're not sure how you got here! Maybe try going back to the
            homepage?
          </p>
          <NavLink to="/">
            <button id="notFoundBtn">HomePage</button>
          </NavLink>
        </div>
      </div>
    </div>
  )
}
