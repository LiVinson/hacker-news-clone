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
    return <Loading message="Fetching Comments" />
  } else if (error) {
    return <h1> There was a problem fetching user comments</h1>
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
          page="post"
          theme={theme}
        />
        <ul>
          {comments.map((comment) => (
            <li key={comment.id} className="list-item">
              <CommentCard
                author={comment.by}
                postDate={comment.time}
                text={comment.text}
                id={comment.id}
                theme={theme}
              />
            </li>
          ))}
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
      <p className="comment-author">
        by{" "}
        <NavLink
          to={`/user?id=${author}`}
          className={theme === "dark" ? "dark-font" : ""}
        >
          {author}
        </NavLink>{" "}
        on {formatDateTime(postDate, true)}
      </p>

      <div className={`comment-text ${theme === "dark" ? "dark-font" : ""}`}>
        <p dangerouslySetInnerHTML={createMarkup(text)} />
      </div>
    </div>
  )
}
