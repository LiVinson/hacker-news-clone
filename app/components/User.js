import React from "react"
import PropTypes from "prop-types"
import queryString from "query-string"

import Loading from "./Loading"
import { getUserPosts } from "../utils/API"
import { formatDateTime, createMarkup } from "../utils/helper"
import { NavLink } from "react-router-dom"
import { ThemeConsumer } from "../context/theme"

export default class User extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      userData: {},
      userStories: [],
      loading: true,
      error: "",
    }
  }

  //Input: N/A
  //Output/Result: Updating state with userData object and userStories array
  componentDidMount() {
    //Retrive user id from url query
    const values = queryString.parse(this.props.location.search)
    const userId = values.id

    getUserPosts(userId)
      .then((user) => {
        this.setState({
          userData: user.userData,
          userStories: user.userPosts,
          loading: false,
        })
      })
      .catch((error) => {
        console.error(error)
        this.setState({
          userStories: [],
          loading: false,
          error: error.message,
        })
      })
  }

  render() {
    const { loading, userData, userStories, error } = this.state

    return (
      <DisplayUserOrMessage
        loading={loading}
        userData={userData}
        userStories={userStories}
        error={error}
      />
    )
  }
}

//Input: loading boolean, userData object, userStories array, error string
//Output: Loading component, Error message, or UserCard and UserPost component
function DisplayUserOrMessage({ loading, userData, userStories, error }) {
  return (
    <ThemeConsumer>
      {({ theme }) => {
        if (loading) {
          return <Loading message="Fetching user data" theme={theme} />
        } else if (error) {
          return <h2>There was a problem fetching user data.</h2>
        } else {
          return (
            <React.Fragment>
              <UserCard
                id={userData.id}
                created={userData.created}
                karma={userData.karma}
                about={userData.about}
                theme={theme}
              />
              <h2 className={theme === "dark" ? "dark-font" : ""}>Posts</h2>
              <UserPosts userStories={userStories} theme={theme} />
            </React.Fragment>
          )
        }
      }}
    </ThemeConsumer>
  )
}

DisplayUserOrMessage.propTypes = {
  loading: PropTypes.bool.isRequired,
  userData: PropTypes.object.isRequired,
  userStories: PropTypes.array.isRequired,
  error: PropTypes.string.isRequired,
}

//Input: story id, date created (unix), amount of user karma points, user about description, and theme type
//Output: Div with user Id and user information
function UserCard({ id, created, karma, about, theme }) {
  return (
    <div>
      <h1 className={theme === "dark" ? "dark-font" : ""}>{id}</h1>
      <p>
        joined{" "}
        <span className="bold-text">{formatDateTime(created, false)}</span> |{" "}
        <span className="bold-text">{karma}</span> karma
      </p>
      <p dangerouslySetInnerHTML={createMarkup(about)} />
    </div>
  )
}

UserCard.propTypes = {
  id: PropTypes.string.isRequired,
  created: PropTypes.number,
  karma: PropTypes.number.isRequired,
  about: PropTypes.string,
  theme: PropTypes.string.isRequired,
}

//Input: array of user stories, theme type
//Output: List of posts with title, author, date and number of comments
function UserPosts({ userStories, theme }) {
  return (
    <ul>
      {userStories.map((story) => (
        <li
          key={story.id}
          className={`list-item ${
            theme === "dark" ? "dark-font" : "light-font"
          }`}
        >
          <a href={story.url} className="article-link" target="_blank">
            {story.title}
          </a>

          <p>
            by{" "}
            <NavLink
              to={`user?id=${story.by}`}
              className={theme === "dark" ? "dark-font" : ""}
            >
              {story.by}
            </NavLink>{" "}
            on {formatDateTime(story.time, false)} with{" "}
            <NavLink to={`/post?id=${story.id}`}>
              {story.kids ? story.kids.length : 0}
            </NavLink>{" "}
            comments
          </p>
        </li>
      ))}
    </ul>
  )
}

UserPosts.propTypes = {
  userStories: PropTypes.array.isRequired,
  theme: PropTypes.string.isRequired,
}
