import React from "react"
import PropTypes from "prop-types"

export function Container({ theme, children }) {
  return (
    <div className={`container ${theme === "dark" ? "bg-dark" : ""}`}>
      {children}
    </div>
  )
}

Container.propTypes = {
  theme: PropTypes.string.isRequired,
}
