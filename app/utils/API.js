//Called when News component mounts. Retreives story Ids in array.
export async function getStories(storyType) {
  console.log(storyType)
  //returns promise with array of up to 500 stores
  let storyIds
  if (storyType === "top") {
    storyIds = await getTopStoryIds()
  } else {
    storyIds = await getNewStoryIds()
  }

  if (storyIds.length > 0) {
    const max100StoryIds =
      storyIds.length > 100 ? storyIds.slice(0, 100) : storyIds

    //Returns an array of story objects wrapped in promise
    const storiesAndJobs = await getStoriesArray(max100StoryIds)
    const stories = storiesAndJobs.filter(story => story.type === "story")
    return stories
  } //deal with error/empty array
}

//returns array of top story ids
function getTopStoryIds() {
  return fetch(
    "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty"
  )
    .then(response => response.json())
    .catch(error => console.log(error)) //Add error function
}

//returns array of new story ids
function getNewStoryIds() {
  return fetch(
    "https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty"
  )
    .then(response => response.json())
    .catch(error => console.log(error)) //Add error function
}

//Input: Array of story Ids from previous request to API
//Output: Array of story objects based on provided Ids
async function getStoriesArray(storyIds) {
  return await Promise.all(storyIds.map(requestStory))
    .then(stories => {
      console.log("promise all", stories[0])
      return stories
    })
    .catch(error => {
      console.log(error) //Figure out error handling
    })
}

//Input: StoryId
//Output: story object for provided Story Id.
export function requestStory(storyId) {
  console.log("requestStories")
  return fetch(
    `https://hacker-news.firebaseio.com/v0/item/${storyId}.json?print=pretty`
  )
    .then(story => story.json())
    .catch(error => console.log(error)) //Figure out error approach
}

//======= Users =========//

//Retreive user object based on userId.

export async function getUserPosts(userId) {
  const user = {
    userData: null,
    userPosts: []
  }
  const userData = await getUserSubmissionIds(userId)

  if (userData !== null) {
    user.userData = userData
    const userSubmissionIds = userData.submitted
    if (userSubmissionIds.length > 0) {
      const userSubmissionIdsMax100 =
        userSubmissionIds.length > 100
          ? userSubmissionIds.slice(0, 150)
          : userSubmissionIds
      const userPosts = await getStoriesArray(userSubmissionIdsMax100)
      console.log("userPosts array")
      console.log(userPosts)
      const userStoryPosts = userPosts.filter(post => {
        if (post !== null && post.type === "story") {
          return post
        }
      })
      user.userPosts = userStoryPosts
      return user
    }
  }
}

//Input storyId
//Returns story Object
function getUserSubmissionIds(userId) {
  return fetch(
    `https://hacker-news.firebaseio.com/v0/user/${userId}.json?print=pretty`
  ).then(response => response.json())
  // .then(userData => userData.submitted)
}

//======== Comments ==============//

export async function getComments(commentIds) {
  console.log(commentIds)
  return await Promise.all(
    commentIds.map(comment => {
      return fetch(
        `https://hacker-news.firebaseio.com/v0/item/${comment}.json?print=pretty`
      )
        .then(response => response.json())
        .then(jsonResponse => {
          console.log(jsonResponse)
          return jsonResponse
        })
    })
  ).then(value => {
    console.log("completed fetch comments")
    console.log(value[0])
    return value
  })
}
