import React from "react"
import ReactDom from "react-dom"
import "./index.css"
import { Container } from "./components/Container"
import Navbar from "./components/NavBar"
import Loading from "./components/Loading"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import { ThemeProvider } from "./context/theme"
const News = React.lazy(() => import("./components/News"))
const User = React.lazy(() => import("./components/User"))
const Comment = React.lazy(() => import("./components/Comment"))

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
  }

  render() {
    return (
      <Router>
        <ThemeProvider value={this.state}>
          <div className={this.state.theme}>
            <Container theme={this.state.theme}>
              <Navbar />
              <React.Suspense
                fallback={
                  <Loading message="Loading" theme={this.state.theme} />
                }
              >
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
                  <Route render={() => <h1>404</h1>} />
                </Switch>
              </React.Suspense>
            </Container>
          </div>
        </ThemeProvider>
      </Router>
    )
  }
}

//Next Steps:
//--Required :

//Production Ready -
//update redirects to work w/ netlify

//---Nice to Have

//Update to class fields
//Improve 404 page
//Improve error messaging
//add testing
//switch to more semantic html
//Improve readme

ReactDom.render(<App />, document.getElementById("root"))
