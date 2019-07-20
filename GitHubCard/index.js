/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/
/* Step 2: Inspect and study the data coming back, this is YOUR 
github info! You will need to understand the structure of this 
data in order to use it to build your component function 

Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
follow this link in your browser https://api.github.com/users/<Your github name>/followers 
, manually find some other users' github handles, or use the list found 
at the bottom of the page. Get at least 5 different Github usernames and add them as
Individual strings to the friendsArray below.

Using that array, iterate over it, requesting data for each user, creating a new card for each
user, and adding that card to the DOM.
*/

// const followersArray = [];

/* Step 3: Create a function that accepts a single object as its only argument,
Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/

/* List of LS Instructors Github username's: 
tetondan
dustinmyers
justsml
luishrd
bigknell
*/

axios
  .get('https://api.github.com/users/danicavaldez')
  .then( data => {
    console.log('profile', data);
    const cards = document.querySelector('.cards')
    cards.appendChild(cardCreator(data.data));
  })
  .catch( error => {
    console.log(error);
  }) 


function cardCreator(profileInfo) {
  // Create Elements
  const card = document.createElement('div')
  const cardInfo = document.createElement('div')
  const img = document.createElement('img')
  const name = document.createElement('h3')
  const username = document.createElement('p')
  const location = document.createElement('p')
  const linkTitle = document.createElement('span')
  const profileLink = document.createElement('a')
  const followers = document.createElement('p')
  const following = document.createElement('p')
  const bio = document.createElement('p')
  
  // Classes assigned
  card.classList.add('card')
  cardInfo.classList.add('card-info')
  img.classList.add('img')
  name.classList.add('name')
  username.classList.add('username')
  location.classList.add('p')
  linkTitle.classList.add('p')
  profileLink.classList.add('p')
  followers.classList.add('p')
  following.classList.add('p')
  bio.classList.add('p')


  // Structure of Elements
  card.appendChild(img)
  card.appendChild(cardInfo)
  cardInfo.appendChild(name)
  cardInfo.appendChild(username)
  cardInfo.appendChild(location)
  cardInfo.appendChild(linkTitle)
  cardInfo.appendChild(profileLink)
  cardInfo.appendChild(followers)
  cardInfo.appendChild(following)
  cardInfo.appendChild(bio)

  // Adding Content
  img.src = profileInfo.avatar_url
  name.textContent = profileInfo.name
  username.textContent = profileInfo.login
  location.textContent = `Location: ${profileInfo.location}`
  linkTitle.textContent = 'Profile: '
  profileLink.href = profileInfo.html_url
  profileLink.textContent = profileInfo.html_url  
  followers.textContent = `Followers: ${profileInfo.followers}`
  following.textContent = `Following: ${profileInfo.following}`
  bio.textContent = `Bio: ${profileInfo.bio}`
  
  return card
}


axios
  .get('https://api.github.com/users/danicavaldez/followers')
  .then(followerData => {
    console.log('followers', followerData.data)
    return followerData.data.forEach( follower => {
      axios
        .get(`https://api.github.com/users/${follower.login}`)
        .then(followerInfo => {
          const cards = document.querySelector('.cards')
          cards.appendChild(cardCreator(followerInfo.data))
        })
        .catch(error => console.log(error))
    })
  })
  .catch(error => console.log(error))

























// axios.get(`https://api.github.com/users/danicavaldez/followers`)
//   .then(resolve => {
//     return resolve.data.forEach(follower => {
//       axios.get(`https://api.github.com/users/${follower.login}`)
//         .then(resolve => {
//           const cards = document.querySelector(".cards")
//           cards.appendChild(cardCreator(resolve.data))
//         })
//         .catch(error => console.log(error));
//     });
//   })
//   .catch(error => console.log(error));