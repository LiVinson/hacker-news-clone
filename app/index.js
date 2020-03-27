import React from "react"
import ReactDom from "react-dom"
import "./index.css"
import News from "./components/News"
import Navbar from "./components/NavBar"

class App extends React.Component {
  render() {
    return (
      <div>
        <Navbar />
        <News storyType="new" />
      </div>
    )
  }
}

ReactDom.render(<App />, document.getElementById("root"))
