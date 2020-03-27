import React from "react"
import propTypes from "prop-types"

export default class Loading extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      message: props.message,
      loadingState: "",
      interval: null
    }

    this.updateLoadingState = this.updateLoadingState.bind(this)
  }

  updateLoadingState() {
    this.setState(({ loadingState }) => {
      const newLoadingState = loadingState === "..." ? "" : loadingState + "."
      return {
        loadingState: newLoadingState
      }
    })
  }

  componentDidMount() {
    const interval = setInterval(this.updateLoadingState, 600)
    this.setState({
      interval
    })
  }

  componentWillUnmount() {
    clearInterval(this.state.interval)
  }

  render() {
    const { message, loadingState } = this.state
    return <h1>{`${message}${loadingState}`}</h1>
  }
}

Loading.propTypes = {
  message: propTypes.string.isRequired
}
