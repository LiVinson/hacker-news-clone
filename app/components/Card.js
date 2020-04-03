import React from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"

export function Card({
  postId,
  title,
  articleUrl,
  author,
  postDate,
  commentCount,
  page
}) {
  return (
    <div>
      <a
        href={articleUrl !== null ? articleUrl : ""}
        className="article-link"
        target="_blank"
      >
        {title}
      </a>

      <p>
        by <Link to={`/user?id=${author}`}>{author}</Link> on{" "}
        {formatDateTime(postDate)} with{" "}
        <Link href={`/post?id=${postId}`}>{commentCount}</Link> comments
      </p>
    </div>
  )
}

Card.propTypes = {
  postId: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  articleUrl: PropTypes.string,
  author: PropTypes.string.isRequired,
  postDate: PropTypes.number.isRequired,
  commentCount: PropTypes.number.isRequired,
  page: PropTypes.string
}

export function formatDateTime(unixDate) {
  const date = new Date(unixDate * 1000)
  const year = date.getFullYear()
  let month = 1 + date.getMonth()
  let day = date.getDate()
  let hours = date.getHours()
  let timeOfDay = "AM"
  if (hours >= 12) {
    timeOfDay = "PM"
    if (hours > 12) {
      hours = hours - 12
    }
  }

  let minutes = date.getMinutes()
  minutes = minutes < 10 ? "0" + minutes : minutes
  const formattedTime = `${month}/${day}/${year}, ${hours}:${minutes} ${timeOfDay}`
  return formattedTime
}
