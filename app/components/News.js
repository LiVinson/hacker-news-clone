import React from "react"
import { getStories } from "../utils/API"
import { Card } from "./Card"

export default class News extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      storyType: props.storyType,
      topStories: [],
      error: null,
      loading: true
    }
  }

  componentDidMount() {
    getStories(this.state.storyType)
      .then(response => {
        console.log("request story response received")
        this.setState({
          topStories: response,
          loading: false
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    const { topStories, loading } = this.state
    return topStories.length > 0 ? (
      <ul>
        {topStories.map(story => {
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
        })}
      </ul>
    ) : (
      <h1>No Top Stories</h1>
    )
  }
}
