//Called when Top component mounts. Retreives story Ids in array.
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

function filterAndLimitStoryIds(storyIdArr) {
  const sortedStories = storyIdAdd.sort((a, b) => {
    return
  })
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
function requestStory(storyId) {
  console.log("requestStories")
  return fetch(
    `https://hacker-news.firebaseio.com/v0/item/${storyId}.json?print=pretty`
  )
    .then(story => story.json())
    .catch(error => console.log(error)) //Figure out error approach
}
