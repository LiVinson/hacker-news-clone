//Called when Top component mounts. Retreives story Ids in array.
export async function getTopStories() {
  //returns promise with array of up to 500 stores
  const topStoryIds = await getTopStoryIds()
  if (topStoryIds.length > 0) {
    console.log(topStoryIds[0])
    //Returns an array of story objects wrapped in promise
    const topStories = await getStories(topStoryIds)
    return topStories
  }
}

//returns array of story ids
function getTopStoryIds() {
  return fetch(
    "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty"
  )
    .then(response => response.json())
    .catch(error => console.log(error)) //Add error function
}

//Input: Array of story Ids from previous request to API
//Output: Array of story objects based on provided Ids
async function getStories(storyIds) {
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
