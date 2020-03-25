import React from "react"
import ReactDom from "react-dom"
import "./index.css"
import Top from "./components/Top"

class App extends React.Component {
  render() {
    return <Top />
  }
}

ReactDom.render(<App />, document.getElementById("root"))
