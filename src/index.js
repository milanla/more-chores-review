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

function createNewChoreCard(event) {
  fetch(mainUrl, {
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
  event.target[0].value = ""
  event.target[1].value = ""
  event.target[2].value = ""
}



let formInput = document.getElementById('new-chore-form')
formInput.addEventListener('submit', (event) => {
  event.preventDefault()
  let title = event.target[0]
  let priority = event.target[1]
  let duration = event.target[2]


  choreContainer.innerHTML += `<div class="chore-card">
  <button class="delete-button">x</button>
  <h3> ${title.value} </h3>
  <p> Duration: ${duration.value} </p>
  <input>
  </div>`

  createNewChoreCard(event)
})

// for deleting a chore card
function deleteNewChoreCard(item, url) {
  fetch(url + '/' + item, {
    method: "DELETE"
  })
  // .then(response => response.json()) we don't need it
}

choreContainer.addEventListener('click', (event) => {
  if (event.target.tagName === 'BUTTON') {
    // debugger
    event.target.parentElement.remove()
    deleteNewChoreCard(parseInt(event.target.dataset.id), "http://localhost:3000/chores")
  }
})
