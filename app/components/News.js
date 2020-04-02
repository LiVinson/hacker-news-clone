import React from "react"
import { getStories } from "../utils/API"
import { Card } from "./Card"
import Loading from "./Loading"

export default class News extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      storyType: props.storyType,
      stories: [],
      error: null,
      loading: true
    }

    this.requestStories = this.requestStories.bind(this)
  }

  componentDidMount() {
    this.requestStories()
  }

  componentDidUpdate(prevProps) {
    if (this.props.storyType !== prevProps.storyType) {
      this.setState(
        {
          loading: true
        },
        () => {
          this.requestStores
        }
      )
    }
  }

  requestStories() {
    getStories(this.props.storyType)
      .then(response => {
        console.log("request story response received")
        this.setState({
          stories: response,
          loading: false
        })
      })
      .catch(err => {
        console.log(err)
      })
  }
  render() {
    const { stories, loading } = this.state
    const loadingMessage =
      this.props.storyType === "top"
        ? "Fetching Top Stories"
        : "Fetching New Stories"
    return loading === true ? (
      <Loading message={loadingMessage} />
    ) : (
      <DisplayStories stories={stories} />
    )
  }
}

function DisplayStories({ stories }) {
  return stories.length > 0 ? (
    stories.map(story => (
      <li key={story.id} className="list-item">
        <Card
          postId={story.id}
          title={story.title}
          articleUrl={story.url}
          author={story.by}
          postDate={story.time}
          commentCount={story.kids ? story.kids.length : 0}
        />
      </li>
    ))
  ) : (
    <h1>No Top Stories</h1>
  )
}
