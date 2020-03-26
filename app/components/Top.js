import React from "react"
import { getTopStories } from "../utils/API"

export default class Top extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      topStories: [],
      error: null,
      loading: null
    }
  }

  componentDidMount() {
    getTopStories()
      .then(response => {
        console.log("request story response received")
        this.setState({
          topStories: response
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    const { topStories } = this.state
    return topStories.length > 0 ? (
      <div>
        <h3>{topStories[0].title}</h3>
        <p>by {topStories[0].by}</p>
        <p>{topStories[0].time}</p>
        <p>{topStories[0].kids.length} Comments</p>
      </div>
    ) : (
      <h1>No Top Stories</h1>
    )
  }
}
