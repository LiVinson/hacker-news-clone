//Called when News component mounts. Returns story Ids in array.
export async function getStories(storyType) {
  //returns promise with array of up to 500 stories
  let storyIds
  if (storyType === "top") {
    storyIds = await getTopStoryIds()
  } else {
    storyIds = await getNewStoryIds()
  }

  if (storyIds.length > 0) {
    const max100StoryIds =
      storyIds.length > 100 ? storyIds.slice(0, 100) : storyIds

    //Returns an array of story and job objects wrapped in promise
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
    .then(stories => stories)
    .catch(error => {
      console.log(error) //Figure out error handling
    })
}

//Input: StoryId
//Output: story object for provided Story Id.
function requestStory(storyId) {
  return fetch(
    `https://hacker-news.firebaseio.com/v0/item/${storyId}.json?print=pretty`
  )
    .then(story => story.json())
    .catch(error => console.log(error)) //Figure out error approach
}

//======= Users =========//

//Retreive user object with userData and array of users's posted story objets
export async function getUserPosts(userId) {
  const user = {
    userData: null,
    userPosts: []
  }
  //Returns user object from provided if
  const userData = await getUserData(userId)

  if (userData !== null) {
    user.userData = userData
    const userSubmissionIds = userData.submitted
    if (userSubmissionIds.length > 0) {
      const userSubmissionIdsMax150 =
        userSubmissionIds.length > 100
          ? userSubmissionIds.slice(0, 150)
          : userSubmissionIds

      //Returns array of user story and job  objects
      const userPosts = await getStoriesArray(userSubmissionIdsMax150)
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
function getUserData(userId) {
  return fetch(
    `https://hacker-news.firebaseio.com/v0/user/${userId}.json?print=pretty`
  ).then(response => response.json())
}

//======== Comments ==============//

//Input: story Id
//Output: Object with story information and array of comment objects
export async function getStoryComments(storyId) {
  const storyData = {
    story: null,
    comments: []
  }
  //function to get array of Commend Ids
  const story = await requestStory(storyId)
  storyData.story = story
  const commentIds = story.kids

  if (commentIds.length > 0) {
    const commentDetails = await getCommentDetails(commentIds)
    console.log("comment details")
    console.log(commentDetails)
    storyData.comments = commentDetails
  }
  return storyData
}

export async function getCommentDetails(commentIds) {
  return await Promise.all(
    commentIds.map(comment => {
      return fetch(
        `https://hacker-news.firebaseio.com/v0/item/${comment}.json?print=pretty`
      ).then(response => response.json())
    })
  ).then(commentArr => commentArr)
}
