document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  let addToy = false

// YOUR CODE HERE

  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
      // submit listener here
    } else {
      toyForm.style.display = 'none'
    }
  })

//step 2 and step 3, get;
  fetch("http://localhost:3000/toys")
  .then(r => r.json())
  .then(toyData => {
    document.getElementById("toy-collection").innerHTML = toyData.map(toy => {
      let newToy = new Toy(toy);
      return newToy.render();
    }).join("")
  })

//step 4, post;
  const newToy = document.getElementsByClassName("add-toy-form")[0];

  newToy.addEventListener("submit", (event) => {
    debugger
    event.preventDefault();
    let inputName = event.target.querySelector("#input-name").value;
    let inputImage = event.target.querySelector("#input-image").value;

    fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: inputName,
        image: inputImage,
        likes: 0
      })
    }).then(r => r.json())
    .then(toy => {
      let newToy = new Toy(toy);
      document.getElementById("toy-collection").innerHTML += newToy.render()
    })
    event.target.reset();
  })

//step 5, likes;
  const toyList = document.getElementById("toy-collection");

  toyList.addEventListener("click", (event) => {
    if (event.target.className === "like-btn"){
      let toyId = event.target.id.split("-")[2];
      let targetToy = Toy.findById(toyId);
      targetToy.likes++;

      fetch(`http://localhost:3000/toys/${toyId}`, {
        method: "PATCH",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          likes: targetToy.likes
        })
      }).then(r => r.json())
      .then(toy => {
        document.getElementById(`like-${toy.id}`).innerText = `${toy.likes} Likes`
      })
    }
  })

//step 6, delete;
  toyList.addEventListener("click", (event) => {
    if (event.target.className === "delete-btn"){
      let toyId = event.target.id.split("-")[2];
      let targetToy = Toy.findById(toyId);

      fetch(`http://localhost:3000/toys/${toyId}`, {
        method: "DELETE"
      })
      document.querySelector(`[data-id="${toyId}"]`).remove()
    }
  })

})
