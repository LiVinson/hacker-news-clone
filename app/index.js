import React from "react"
import ReactDom from "react-dom"
import "./index.css"
import News from "./components/News"
import Navbar from "./components/NavBar"
import User from "./components/User"
import Comment from "./components/Comment"
import { Container } from "./components/Container"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"

class App extends React.Component {
  render() {
    return (
      <Router>
        <Container>
          <Navbar />
          <Switch>
            <Route
              exact
              path="/"
              render={props => <News {...props} storyType="top" />}
            />
            <Route
              exact
              path="/new"
              render={props => <News {...props} storyType="new" />}
            />
            <Route path="/user" component={User} />
            <Route path="/post" component={Comment} />
          </Switch>
        </Container>
      </Router>
    )
  }
}

//Next Steps:

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
