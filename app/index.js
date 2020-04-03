import React from "react"
import ReactDom from "react-dom"
import "./index.css"
import News from "./components/News"
import Navbar from "./components/NavBar"
import User from "./components/User"
import Comment from "./components/Comment"
import { Container } from "./components/Container"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import { ThemeProvider } from "./context/theme"
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      theme: "light",
      changeTheme: () => {
        console.log("theme change")
        this.setState(curState => {
          return {
            theme: curState.theme === "light" ? "dark" : "light"
          }
        })
      }
    }

    this.changeTheme = this.changeTheme.bind(this)
  }

  changeTheme() {}

  render() {
    return (
      <Router>
        <Container>
          <ThemeProvider value={this.state}>
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
          </ThemeProvider>
        </Container>
      </Router>
    )
  }
}

//Next Steps:

//Minor styling tweaks - navbar top,
//Implement Dark theme with context, add state to App to manage
//Clean up API
//Clean up commenting
//Readme
//Production Ready

ReactDom.render(<App />, document.getElementById("root"))
