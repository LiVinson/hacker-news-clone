import React from "react"
import propTypes from "prop-types"

export default class Loading extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      loadingState: "",
      interval: null,
    }

    this.updateLoadingState = this.updateLoadingState.bind(this)
  }

  updateLoadingState() {
    this.setState(({ loadingState }) => {
      const newLoadingState = loadingState === "..." ? "" : loadingState + "."
      return {
        loadingState: newLoadingState,
      }
    })
  }

  componentDidMount() {
    console.log(this.props.message)
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
