const mainUrl = 'http://localhost:3000/chores'
let choreContainer = document.getElementById('chore-list')

fetch(mainUrl)
.then(function(response) {
  return response.json()
})
.then(function(json) {
  renderChoreCard(json)
})

function renderChoreCard(choreList) {

  choreList.forEach(function(chore) {
    choreContainer.innerHTML += `<div class="chore-card">
  <button class="delete-button" data-id='${chore["id"]}'>x</button>
  <h3> ${chore["title"]} </h3>
  <p> Duration: ${chore["duration"]} </p>
  <input><!-- value should have the importance  -->
</div>`
  })

}

// for posting a new chore card


function createNewChoreCard(url) {
  return fetch(url, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Accepts': 'application/json'
    },
    body: JSON.stringify({
      title: document.getElementById("title").value,
      priority: document.getElementById("priority").value,
      duration: document.getElementById("duration").value
    }) // whatever data we got
  })
  .then(response => response.json()) // parses response to JSON!
}

let formInput = document.getElementById('new-chore-form')
formInput.addEventListener('submit', (event) => {
  event.preventDefault()
  // console.log("hey")
  createNewChoreCard("http://localhost:3000/chores")
  .then(json => {
    // debugger
      choreContainer.innerHTML += `<div class="chore-card">
    <button class="delete-button" data-id="${json["id"]}">x</button>
    <h3> ${json["title"]} </h3>
    <p> Duration: ${json["duration"]} </p>
    <input><!-- value should have the importance  -->
  </div>`
  })
  document.getElementById("title").value = ""
  document.getElementById("priority").value = ""
  document.getElementById("duration").value = ""
  })




// for deleting a chore card
function deleteNewChoreCard(item, url) {
  return fetch(url + '/' + item, {
    method: "DELETE",
  })
  .then(response => response.json())
}

// let deleteButton = document.querySelector('.delete-button')
choreContainer.addEventListener('click', (event) => {
  if (event.target.tagName === 'BUTTON') {
    debugger
    event.target.parentElement.remove()
    deleteNewChoreCard(parseInt(event.target.dataset.id), "http://localhost:3000/chores")
  }
})
