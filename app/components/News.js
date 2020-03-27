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

    this.displayStories = this.displayStories.bind(this)
  }

  componentDidMount() {
    getStories(this.state.storyType)
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

  displayStories(story) {
    return (
      <li key={story.id}>
        <Card
          postId={story.id}
          title={story.title}
          articleUrl={story.url}
          author={story.by}
          postDate={story.time}
          commentCount={story.kids ? story.kids.length : 0}
        />
      </li>
    )
  }

  render() {
    const { stories, loading } = this.state
    const loadingMessage =
      this.state.storyType === "top"
        ? "Fetching Top Stories"
        : "Fetching New Stories"
    return loading === true ? (
      <Loading message={loadingMessage} />
    ) : stories.length > 0 ? (
      <ul>{stories.map(this.displayStories)}</ul>
    ) : (
      <h1>No Top Stories</h1>
    )
  }
}
