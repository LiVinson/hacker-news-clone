export function createMarkup(text) {
  console.log(text)
  return {
    __html: text
  }
}

export function formatDateTime(unixDate, includeTime) {
  const date = new Date(unixDate * 1000)
  const year = date.getFullYear()
  let month = 1 + date.getMonth()
  let day = date.getDate()

  const formattedDate = `${month}/${day}/${year}`
  if (!includeTime) {
    return formattedDate
  }

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
  const formattedDateTime = `${formattedDate}, ${hours}:${minutes} ${timeOfDay}`
  return formattedDateTime
}
