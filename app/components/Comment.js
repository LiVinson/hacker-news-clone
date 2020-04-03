import React from "react"
import queryString from "query-string"
import Loading from "./Loading"
import Card from "./Card"
import { getStoryComments } from "../utils/API"
import { formatDateTime, createMarkup } from "../utils/helper"

import { Link } from "react-router-dom"

export default class Comment extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      story: null,
      commentIds: null,
      comments: null,
      loading: true,
      error: false
    }
  }

  componentDidMount() {
    //Get story id from url
    const values = queryString.parse(this.props.location.search)

    getStoryComments(values.id)
      .then(response => {
        this.setState({
          story: response.story,
          comments: response.comments,
          loading: false
        })
      })
      .catch(error => {
        console.warn(error)
        this.setState({
          loading: false,
          error: true
        })
      })
  }

  render() {
    const { loading, comments, story, error } = this.state

    return (
      <DisplayCommentOrMessage
        loading={loading}
        comments={comments}
        story={story}
        error={error}
      />
    )
  }
}

function DisplayCommentOrMessage({ loading, comments, story, error }) {
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
        />
        <ul>
          {comments.map(comment => (
            <li key={comment.id} className="list-item">
              <CommentCard
                author={comment.by}
                postDate={comment.time}
                text={comment.text}
                id={comment.id}
              />
            </li>
          ))}
        </ul>
      </React.Fragment>
    )
  }
}

function CommentCard({ author, postDate, text, id }) {
  return (
    <div className="comment-card">
      <p className="comment-author">
        by <Link to={`/user?id=${author}`}>{author}</Link> on{" "}
        {formatDateTime(postDate, true)}
      </p>

      <div className="comment-text">
        <p dangerouslySetInnerHTML={createMarkup(text)} />
      </div>
    </div>
  )
}
