import React from "react"
import propTypes from "prop-types"
import { ThemeConsumer } from "../context/theme"

export default class Loading extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      message: props.message,
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
    const interval = setInterval(this.updateLoadingState, 600)
    this.setState({
      interval,
    })
  }

  componentWillUnmount() {
    clearInterval(this.state.interval)
  }

  render() {
    const { message, loadingState } = this.state
    return (
      <ThemeConsumer>
        {({ theme }) => {
          return (
            <h1
              className={theme === "dark" ? "dark-font" : ""}
            >{`${message}${loadingState}`}</h1>
          )
        }}
      </ThemeConsumer>
    )
  }
}

Loading.propTypes = {
  message: propTypes.string.isRequired,
}

Loading.defaultProps = {
  message: "Loading",
}
