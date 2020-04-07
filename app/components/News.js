import React from "react"
import PropTypes from "prop-types"
import { getStories } from "../utils/API"
import Card from "./Card"
import Loading from "./Loading"
import { ThemeConsumer } from "../context/theme"

export default class News extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      stories: [],
      error: null,
      loading: true,
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
          loading: true,
        },
        () => {
          this.requestStores
        }
      )
    }
  }

  requestStories() {
    getStories(this.props.storyType)
      .then((response) => {
        console.log("request story response received")
        this.setState({
          stories: response,
          loading: false,
        })
      })
      .catch((error) => {
        console.warn(error)
        this.setState({
          loading: false,
          error: error,
        })
      })
  }
  render() {
    const { stories, loading, error } = this.state
    return (
      <DisplayNews
        stories={stories}
        loading={loading}
        error={error}
        storyType={this.props.storyType}
      />
    )
  }
}

News.propType = {
  storyType: PropTypes.string.isRequired,
}

//Input: array of story objects
//Output: A list item for each story made of Card component
function DisplayStories({ stories }) {
  return (
    <ThemeConsumer>
      {({ theme }) => {
        return stories.length > 0 ? (
          stories.map((story) => (
            <li
              key={story.id}
              className={`list-item ${
                theme === "dark" ? "dark-font" : "light-font"
              }`}
            >
              <Card
                postId={story.id}
                title={story.title}
                articleUrl={story.url}
                author={story.by}
                postDate={story.time}
                commentCount={story.kids ? story.kids.length : 0}
                theme={theme}
              />
            </li>
          ))
        ) : (
          <h1 className={theme === "dark" ? "dark-font" : ""}>
            No Top Stories
          </h1>
        )
      }}
    </ThemeConsumer>
  )
}

DisplayStories.propType = {
  stories: PropTypes.array.isRequired,
}

//Input: array of stories, loading and error boolean, and storyType
//Output: Component to DisplayStories, Loading, or Error messge
function DisplayNews({ stories, loading, error, storyType }) {
  if (loading) {
    const loadingMessage =
      storyType === "top" ? "Fetching Top Stories" : "Fetching New Stories"
    return <Loading message={loadingMessage} />
  } else if (error) {
    return <h2>There was a problem fetching news stories.</h2>
  } else {
    return <DisplayStories stories={stories} />
  }
}

DisplayNews.propType = {
  stories: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  storyType: PropTypes.string.isRequred,
}
