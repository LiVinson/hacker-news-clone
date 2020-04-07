import React from "react"
import PropTypes from "prop-types"
import queryString from "query-string"
import { NavLink } from "react-router-dom"
import Loading from "./Loading"
import { getUserPosts } from "../utils/API"
import { formatDateTime, createMarkup } from "../utils/helper"
import { ThemeConsumer } from "../context/theme"

export default class User extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      userData: null,
      userStories: [],
      loading: true,
      error: false,
    }
  }

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
        this.setState({
          loading: false,
          error: true,
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

function DisplayUserOrMessage({ loading, userData, userStories, error }) {
  return (
    <ThemeConsumer>
      {({ theme }) => {
        if (loading) {
          return <Loading message="Fetching user data" />
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
