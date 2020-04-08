//Input: string - type of story (new or top)
//Output: Array of story objects
export async function getStories(storyType) {
  //returns promise with array of up to 500 stories
  let storyIds = []
  if (storyType === "top") {
    storyIds = await getTopStoryIds()
  } else {
    //new stories
    storyIds = await getNewStoryIds()
  }

  if (storyIds.error) {
    throw new Error(`There was an error fetching ${storyType} stories.`)
  } else if (storyIds.length === 0) {
    return []
  } else {
    //Limit number of story ids in array to 100
    const limitedStoryIds = limitResults(storyIds, 100)

    //Returns an array of story and job objects
    const storiesAndJobs = await getStoriesArray(limitedStoryIds)
    const stories = filterByType(storiesAndJobs, "type", "story")
    return stories
  }
}

//Input: None
//Output: Array of top story ids from hacker news API
function getTopStoryIds() {
  return fetch(
    "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty"
  )
    .then((response) => response.json())
    .catch((error) => error)
}

//Input: None
//Output: Array of new story ids from hacker news API
function getNewStoryIds() {
  return fetch(
    "https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty"
  )
    .then((response) => response.json())
    .catch((error) => error)
}

//Input: Array of story Ids
//Output: Array of story objects based on provided story Ids
async function getStoriesArray(storyIds) {
  //await used to wait for result of mapping over each story id and fetching story  .
  return Promise.all(storyIds.map(await requestStory)) //pickle - confirm if requests stop on first error.
    .then((stories) => stories)
    .catch((error) => error)
}

//Input: StoryId
//Output: story object for provided Story Id.
function requestStory(storyId) {
  return fetch(
    `https://hacker-news.firebaseio.com/v0/item/${storyId}.json?print=pretty`
  ).then((story) => story.json())
  // .catch((error) => error)
}

//======= Users =========//

//Input: User Id string ---
//Output: user object with userData object property and userPosts array of story objects
export async function getUserPosts(userId) {
  const user = {
    userData: null,
    userPosts: [],
  }
  //Returns user object from provided id
  const userData = await getUserData(userId)

  if (userData) {
    user.userData = userData
    const userSubmissionIds = userData.submitted

    if (userSubmissionIds.length > 0) {
      const limitedSubmissionIds = limitResults(userSubmissionIds, 151)

      //Returns array of user postings
      const userPosts = await getStoriesArray(limitedSubmissionIds)

      if (userPosts.length > 0) {
        //Returns array of all non-story postings filtered out
        const userStoryPosts = filterByType(userPosts, "type", "story")
        user.userPosts = userStoryPosts
      } else {
        throw new Error(
          `There was an error retreiving posts for user ${userId}`
        )
      }
    }
    return user
  } else {
    throw new Error(
      `There was an error retreiving information for user ${userId}`
    )
  }
}

//Input: User Id
//Output: Returns user object
function getUserData(userId) {
  return fetch(
    `https://hacker-news.firebaseio.com/v0/user/${userId}.json?print=pretty`
  )
    .then((response) => response.json())
    .catch((error) => error)
}

//======== Comments ==============//

//Input: story Id
//Output: Object with story information and array of comment object properties
export async function getStoryComments(storyId) {
  const storyData = {
    story: null,
    comments: [],
  }

  try {
    const story = await requestStory(storyId)
    storyData.story = story
    const commentIds = story.kids

    if (commentIds.length > 0) {
      const commentDetails = await getCommentDetails(commentIds)
      console.log(commentDetails)
      storyData.comments = commentDetails
    }
    return storyData
  } catch (error) {
    console.log(error)
    throw new Error("There was an error retreiving story and comments.")
  }
}

//Input: Array of comment Ids
//Output: Array of comment objects corresponding to ids of input array
async function getCommentDetails(commentIds) {
  const comments = []

  //for loop allows for breaking out of loop if error received on any fetch request.
  for (let i = 0; i < commentIds.length; i++) {
    let comment = await fetch(
      `https://hacker-news.firebaseio.com/v0/item/${commentIds[i]}.json?print=pretty`
    )
      .then((response) => response.json())
      .then((jsonResponse) => {
        if (jsonResponse.error) {
          throw new Error(jsonResponse.error)
        } else {
          return jsonResponse
        }
      })
    comments.push(comment)
  }

  return comments
}

//------General Functions

//limits number of elements in array
function limitResults(arr, limit) {
  let limitedArray
  if (arr.length > limit) {
    limitedArray = arr.slice(0, limit)
  } else {
    limitedArray = arr
  }
  return limitedArray
}

//Filters out all elements from array except for those with a "filter" value on "property" key of array element
function filterByType(arr, property, filter) {
  const filteredArray = arr.filter(
    (item) => item.hasOwnProperty(property) && item[property] === filter
  )
  return filteredArray
}
