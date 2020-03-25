//Request top stories from Hackerrank

export async function getTopStoryIds() {
  //console.log("request top stories")

  fetch("https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty")
    .then(storyIdResponse => storyIdResponse.json())
    .then(storyIdResponseJson => {
      //if (storyIdResponseJson.length === 0 || storyIdResponstoryIdResponseJsonseJson == null) {
      //console.warn("there was a problem retreiving stories.")
      //return []
      //}
      Promise.all(
        storyIdResponseJson.map(storyId =>
          fetch(
            `https://hacker-news.firebaseio.com/v0/item/${storyId}.json?print=pretty`
          ).then(storyResponse => storyResponse.json())
        )
      ).then(stories => {
        console.log(stories[0])
        return stories
      })
    })
    .catch(err => {
      console.log("there was an error")
      console.log(err)
    })
}

// async function getTopStories(stories) {
//   const promises = stories.map(async story => {
//     fetch(
//       `https://hacker-news.firebaseio.com/v0/item/${story}.json?print=pretty`
//     ).then(response => {
//       response.json().then(storyObj => {
//         // console.log(storyObj)
//         return storyObj
//       })
//     })
//   })

//   Promise.all(promises).then(value => {
//     console.log("value")
//     console.log(value[0])
//   })
// }

// export function requestTopStories() {
//   getTopStoryIds()
//   //   storyIdsArr.then(values => {
//   //     console.log(value)
//   //   })
//   //   Promise.all([getTopStoryIds]).then(values => {
//   //     console.log(values[0])
//   //   })
// }
