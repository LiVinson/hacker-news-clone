import React from "react"
import queryString from "query-string"
import Loading from "./Loading"
import Card from "./Card"
import { getStoryComments } from "../utils/API"
import { formatDateTime, createMarkup } from "../utils/helper"
import { NavLink } from "react-router-dom"
import { ThemeConsumer } from "../context/theme"

export default class Comment extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      story: null,
      comments: null,
      loading: true,
      error: "",
    }
  }

  componentDidMount() {
    //Get story id from url
    const values = queryString.parse(this.props.location.search)

    getStoryComments(values.id)
      .then((response) => {
        this.setState({
          story: response.story,
          comments: response.comments,
          loading: false,
        })
      })
      .catch((error) => {
        console.warn(error)
        this.setState({
          loading: false,
          error: error.message,
        })
      })
  }

  render() {
    const { loading, comments, story, error } = this.state

    return (
      <ThemeConsumer>
        {({ theme }) => {
          return (
            <DisplayCommentOrMessage
              loading={loading}
              comments={comments}
              story={story}
              error={error}
              theme={theme}
            />
          )
        }}
      </ThemeConsumer>
    )
  }
}

function DisplayCommentOrMessage({ loading, comments, story, error, theme }) {
  if (loading) {
    return <Loading message="Fetching Comments" theme={theme} />
  } else if (error) {
    return (
      <h2 className={theme === "dark" ? "light-gray-text" : ""}>{error}</h2>
    )
  } else {
    return (
      <React.Fragment>
        <Card
          postId={story.id}
          title={story.title}
          articleUrl={story.url}
          author={story.by}
          postDate={story.time}
          commentCount={story.kids ? story.kids.length : 0}
          postPage={true}
          theme={theme}
        />
        <ul>
          {comments.map((comment) => {
            {
              if (comment.text) {
                return (
                  <li key={comment.id} className="list-item">
                    <CommentCard
                      author={comment.by}
                      postDate={comment.time}
                      text={comment.text}
                      id={comment.id}
                      theme={theme}
                    />
                  </li>
                )
              }
            }
          })}
        </ul>
      </React.Fragment>
    )
  }
}

function CommentCard({ author, postDate, text, id, theme }) {
  return (
    <div
      className={`comment-card ${theme === "dark" ? "dark-bg" : "light-bg"}`}
    >
      <p className="dark-gray-text">
        by{" "}
        <NavLink
          to={`/user?id=${author}`}
          className={theme === "dark" ? "light-gray-text" : ""}
        >
          {author}
        </NavLink>{" "}
        on {formatDateTime(postDate, true)}
      </p>

      <div
        className={`comment-text ${theme === "dark" ? "light-gray-text" : ""}`}
      >
        <p dangerouslySetInnerHTML={createMarkup(text)} />
      </div>
    </div>
  )
}
