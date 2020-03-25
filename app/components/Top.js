import React from "react"
import { requestTopStories, getTopStoryIds } from "../utils/API"

export default class Top extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      topStoryIds: [],
      error: null,
      loading: null
    }
  }

  componentDidMount() {
    getTopStoryIds()
      .then(response => {
        console.log("request story response received")
        //  console.log(response[0])
      })
      .catch(err => {
        console.log(err)
      })
  }

  topStories() {}

  render() {
    return <h1>Top Component</h1>
  }
}
