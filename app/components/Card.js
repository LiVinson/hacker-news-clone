import React from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import { formatDateTime } from "../utils/helper"

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
        {(formatDateTime(postDate), true)} with{" "}
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
