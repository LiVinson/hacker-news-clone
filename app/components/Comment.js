import React from "react"
import { getComments } from "../utils/API"

export default class Comment extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      storyId: props.storyId,
      commentIds: [],
      loading: true
    }
  }

  componentDidMount() {
    const commentIds = [22714034, 22711772, 22712438, 22712624]
    getComments(commentIds).then(response => {
      console.log("get Comments response received")
      console.log(response)
    })
  }

  render() {
    return <h1>Comments</h1>
  }
}
