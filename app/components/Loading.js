import React from "react"
import propTypes from "prop-types"

export default class Loading extends React.Component {
  state = {
    loadingState: "",
    interval: null,
  }

  updateLoadingState = () => {
    this.setState(({ loadingState }) => {
      const newLoadingState = loadingState === "..." ? "" : loadingState + "."
      return {
        loadingState: newLoadingState,
      }
    })
  }

  componentDidMount() {
    const interval = setInterval(this.updateLoadingState, 600)
    this.setState({
      interval,
    })
  }

  componentWillUnmount() {
    clearInterval(this.state.interval)
  }

  render() {
    const { loadingState } = this.state
    const { theme, message } = this.props
    const fontColor = theme === "dark" ? "light-gray-text" : ""
    return <h1 className={fontColor}>{`${message}${loadingState}`}</h1>
  }
}

Loading.propTypes = {
  message: propTypes.string.isRequired,
}
