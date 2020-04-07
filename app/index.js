import React from "react"
import ReactDom from "react-dom"
import "./index.css"
import { Container } from "./components/Container"
import Navbar from "./components/NavBar"
import Loading from "./components/Loading"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import { ThemeProvider } from "./context/theme"

// import News from "./components/News"
// import User from "./components/User"
// import Comment from "./components/Comment"

const News = React.lazy(() => import("./components/News"))
const User = React.lazy(() => import("./components/User"))
const Comment = React.lazy(() => import("./components/User"))

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
            <Container>
              <Navbar />
              <React.Suspense fallback={<Loading />}>
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

//--Required Required:

//Finish dark theme styling/clean up context
//Production Ready - update redirects to work w/ netlify

//---Nice to Have
//Readme
//Update to class fields
//Clean up API
//Clean up commenting
//Improve 404 page

ReactDom.render(<App />, document.getElementById("root"))
