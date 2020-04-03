import React from "react"
import PropTypes from "prop-types"
import queryString from "query-string"
import { Link } from "react-router-dom"
import Loading from "./Loading"
import { getUserPosts } from "../utils/API"
import { formatDateTime, createMarkup } from "../utils/helper"

export default class User extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      userData: null,
      userStories: [],
      loading: true,
      error: false
    }
  }

  componentDidMount() {
    //Retrive user id from url query
    const values = queryString.parse(this.props.location.search)
    const userId = values.id

    getUserPosts(userId)
      .then(user => {
        this.setState({
          userData: user.userData,
          userStories: user.userPosts,
          loading: false
        })
      })
      .catch(error => {
        this.setState({
          loading: false,
          error: true
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
        />
        <h2>Posts</h2>
        <UserPosts userStories={userStories} />
      </React.Fragment>
    )
  }
}

function UserCard({ id, created, karma, about }) {
  return (
    <div>
      <h1 className="user-header">{id}</h1>
      <p>
        joined{" "}
        <span styles={{ fontWeight: "bold" }}>
          {formatDateTime(created, false)}
        </span>{" "}
        | <span styles={{ fontWeight: "bold" }}>{karma}</span> karma
      </p>
      <p dangerouslySetInnerHTML={createMarkup(about)} />
    </div>
  )
}

function UserPosts({ userStories }) {
  return (
    <ul>
      {userStories.map(story => (
        <li key={story.id} className="list-item">
          <a href={story.url} className="article-link" target="_blank">
            {story.title}
          </a>

          <p>
            by {story.by} on {story.time} with{" "}
            <Link to={`/post?id=${story.id}`}>
              {story.kids ? story.kids.length : 0}
            </Link>{" "}
            comments
          </p>
        </li>
      ))}
    </ul>
  )
}
