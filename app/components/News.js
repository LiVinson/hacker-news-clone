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
      error: "",
      loading: true,
    }

    this.requestStories = this.requestStories.bind(this)
  }

  componentDidMount() {
    this.requestStories()
  }

  //Input: current storyType (new or top)
  //If storyType has changed (based on change in nav selection of Top or New), reset loading state and request updated stories
  componentDidUpdate(prevProps) {
    if (this.props.storyType !== prevProps.storyType) {
      this.setState(
        {
          loading: true,
          error: "",
          stories: [],
        },
        () => {
          this.requestStories()
        }
      )
    }
  }

  //Input: None
  //Output: Set state with stories array received from request, or error message
  requestStories() {
    getStories(this.props.storyType)
      .then((response) => {
        this.setState({
          stories: response,
          loading: false,
          error: "",
        })
      })
      .catch((error) => {
        this.setState({
          loading: false,
          error: error.message,
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

//Input: array of stories, loading boolean,  error message, and storyType (new or top)
//Output: Component to DisplayStories, Loading, or Error message
function DisplayNews({ stories, loading, error, storyType }) {
  return (
    <ThemeConsumer>
      {({ theme }) => {
        if (loading) {
          const loadingMessage =
            storyType === "top"
              ? "Fetching Top Stories"
              : "Fetching New Stories"
          return <Loading message={loadingMessage} theme={theme} />
        } else if (error) {
          return (
            <h2 className={theme === "dark" ? "light-gray-text" : ""}>
              {error}
            </h2>
          )
        } else {
          return <DisplayStories stories={stories} theme={theme} />
        }
      }}
    </ThemeConsumer>
  )
}

DisplayNews.propType = {
  stories: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  storyType: PropTypes.string.isRequred,
}

//Input: array of story objects
//Output: A list item for each story made of Card component
function DisplayStories({ stories, theme }) {
  return stories.length > 0 ? (
    <ul>
      {stories.map((story) => (
        <li key={story.id} className="list-item">
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
      ))}
    </ul>
  ) : (
    <h1 className={theme === "dark" ? "dark-font" : ""}>No Top Stories</h1>
  )
}

DisplayStories.propType = {
  stories: PropTypes.array.isRequired,
}
