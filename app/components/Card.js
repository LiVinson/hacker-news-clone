import React from "react"
import PropTypes from "prop-types"
import { NavLink } from "react-router-dom"
import { formatDateTime } from "../utils/helper"

export default function Card({
  postId,
  title,
  articleUrl,
  author,
  postDate,
  commentCount,
  postPage = false,
  theme,
}) {
  let titleColor = "red-text"
  let byLineColor = "dark-gray-text"
  let linkColor = "black-text"
  let titleType = ""
  if (postPage) {
    titleType = "article-header"
  }

  if (theme === "dark") {
    titleColor = "light-gray-text"
    linkColor = "light-gray-text"
  }
  return (
    <div>
      <a
        href={articleUrl !== null ? articleUrl : ""}
        className={`article-link ${titleColor} ${titleType}`}
        target="_blank"
      >
        {title}
      </a>

      <p className={byLineColor}>
        by{" "}
        <NavLink to={`/user?id=${author}`} className={linkColor}>
          {author}
        </NavLink>{" "}
        on {formatDateTime(postDate, true)} with{" "}
        <NavLink to={`/post?id=${postId}`} className={linkColor}>
          {commentCount}
        </NavLink>{" "}
        comments
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
  page: PropTypes.string,
  theme: PropTypes.string.isRequired,
}
