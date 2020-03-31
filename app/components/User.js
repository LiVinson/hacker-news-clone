import React from "react"
import PropTypes from "prop-types"
import { getUserPosts } from "../utils/API"
import Loading from "./Loading"
import queryString from "query-string"
import { Link } from "react-router-dom"

export default class User extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      userData: null,
      userStories: [],
      loading: true
    }
  }

  componentDidMount() {
    const values = queryString.parse(this.props.location.search)

    const userId = values.id // for testing
    console.log(userId)
    getUserPosts(userId).then(user => {
      this.setState({
        userData: user.userData,
        userStories: user.userPosts,
        loading: false
      })
    })
  }

  render() {
    const { loading, userData, userStories } = this.state
    return loading === true ? (
      <Loading message="Fetching user data" />
    ) : (
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
      <h1>{id}</h1>
      <p>
        joined {created} has {karma} karma
      </p>
      <p>{about}</p>
    </div>
  )
}

function UserPosts({ userStories }) {
  return (
    <ul>
      {userStories.map(story => (
        <li key={story.id}>
          <h3>
            <a href={story.url} target="_blank">
              {story.title}
            </a>
          </h3>
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
