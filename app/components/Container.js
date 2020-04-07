import React from "react"
import { ThemeConsumer } from "../context/theme"

export function Container({ children }) {
  return (
    <ThemeConsumer>
      {({ theme }) => {
        return (
          <div className={`container ${theme === "dark" ? "bg-dark" : ""}`}>
            {children}
          </div>
        )
      }}
    </ThemeConsumer>
  )
}
