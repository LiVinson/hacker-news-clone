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
        this.setState((curState) => {
          return {
            theme: curState.theme === "light" ? "dark" : "light",
          }
        })
      },
    }

    this.changeTheme = this.changeTheme.bind(this)
  }

  changeTheme() {}

  render() {
    return (
      <Router>
        <ThemeProvider value={this.state}>
          <div className={this.state.theme}>
            <Container>
              <Navbar />
              <Switch>
                <Route
                  exact
                  path="/"
                  render={(props) => <News {...props} storyType="top" />}
                />
                <Route
                  exact
                  path="/new"
                  render={(props) => <News {...props} storyType="new" />}
                />
                <Route path="/user" component={User} />
                <Route path="/post" component={Comment} />
              </Switch>
            </Container>
          </div>
        </ThemeProvider>
      </Router>
    )
  }
}

//Next Steps:

//Minor styling tweaks - navbar top,
// Dark theme styling:
/*
change body background to black
navbar: Change black font to white
change news headers to white
change news user and comment links to white
user: change user id, post header, and article header to white
user: change comments link white
loading text: white
Comments: header to white, link text to white
//main text to white, background to dark gray
*/
//Lazy Loading
//Update favicon
//Clean up API
//Clean up commenting
//Readme
//Production Ready:

ReactDom.render(<App />, document.getElementById("root"))
