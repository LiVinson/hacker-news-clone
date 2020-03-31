import React from "react"
import { getStoryComments } from "../utils/API"
import Loading from "./Loading"
import { Card, formatDateTime } from "./Card"

export default class Comment extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      storyId: props.storyId,
      story: null,
      commentIds: null,
      comments: null,
      loading: true
    }
  }

  componentDidMount() {
    const storyId = 22722211

    getStoryComments(storyId).then(response => {
      console.log("response received")
      console.log(response)
      this.setState({
        story: response.story,
        comments: response.comments,
        loading: false
      })
    })
  }

  render() {
    const { loading, comments, story } = this.state
    return loading === true ? (
      <Loading message="Fetching comments" />
    ) : (
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
            <li key={comment.id}>
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
    <div>
      <p>
        by <a href={`/user?id=${author}`}>{author}</a> on{" "}
        {formatDateTime(postDate)}
      </p>
      <p>{text}</p>
    </div>
  )
}
