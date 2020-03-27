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
        <News storyType="top" />
      </div>
    )
  }
}

//Next Steps:
//Loading Method working with message passed in
//Style the News component
//User component
//API: get posts by the user that was selected. Reuse Card component
//Get it working with loading
//Style User component
//Comment Components -
//API: get comments based on postId.
//may be able to resuse card with props.children. if not, can atleast reuse date formatting function
//includes links to commenters page
//Remaining styling
//Add in routing
//Implement Dark theme
//Testing?

ReactDom.render(<App />, document.getElementById("root"))
