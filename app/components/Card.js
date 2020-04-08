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
  page,
  theme,
}) {
  return (
    <div className={theme === "dark" ? "dark-font" : "light-font"}>
      <a
        href={articleUrl !== null ? articleUrl : ""}
        className={`article-link ${page === "post" ? "article-header" : ""}`}
        target="_blank"
      >
        {title}
      </a>

      <p>
        by{" "}
        <NavLink
          to={`/user?id=${author}`}
          className={theme === "dark" ? "dark-font" : ""}
        >
          {author}
        </NavLink>{" "}
        on {(formatDateTime(postDate, true), true)} with{" "}
        <NavLink
          to={`/post?id=${postId}`}
          className={theme === "dark" ? "dark-font" : ""}
        >
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
