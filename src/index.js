document.addEventListener("DOMContentLoaded", () => {
const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

// YOUR CODE HERE
//step 2 and step 3;
const toyContainerToAppendToyCards = document.querySelector("#toy-collection")

fetch('http://localhost:3000/toys', {
  method: 'GET'
})
  .then(response => response.json())
  .then(toyData => {
    // console.log(toyData)
    const toyCardHTMLString = toyData.map(/*FUNCTION*/(toyJSONObject) => {
      const newToyObj = new Toy(toyJSONObject)
      return newToyObj.render();
    })
    toyContainerToAppendToyCards.innerHTML = toyCardHTMLString.join('')

  })


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

//step 4;
const addNewToyHandler = document.querySelector(".add-toy-form");
// console.log("HTML:", addNewToyHandler)
addNewToyHandler.addEventListener('submit', (event) => {
  event.preventDefault();
  const newToyInputNameValue = event.target.querySelector('#input-name').value
  const newToyInputImageValue = event.target.querySelector('#input-image').value

  // console.log("inputName:", newToyInputNameValue);
  // console.log("inputImage:", newToyInputImageValue);

  fetch('http://localhost:3000/toys', {
    method: 'POST', //which HTTP verb am i using
    headers: {
      'Accept': 'application/json', //i am expecting JSON back
      'Content-Type': 'application/json' //i am sending you JSON
    },
    body: JSON.stringify({
      //JSON object with data; in rails this will come through via params
      name: newToyInputNameValue,
      image: newToyInputImageValue,
      likes: 0
    })
  }).then(response => response.json())
    .then(jsonToy => {
      // create a new JS object with the data sent from the server
      const newlyCreatedToy = new Toy(jsonToy)
      // render that newly created pokemon
      // console.log(newlyCreatedToy.render());
      toyContainerToAppendToyCards.innerHTML += newlyCreatedToy.render()
    })

  event.target.reset() //clear the form
})

//step 5;

toyContainerToAppendToyCards.addEventListener("click", (event) => {
  // if (event.target.className === "like-btn"){
    let toyName = event.target.id;
    fetch("http://localhost:3000/toys/")
    .then(response => response.json())
    .then(toyData => {
      let toyObj = toyData.find((toyObj) => toyObj.name === toyName)
      toyObj.likes += 1;
      fetch(`http://localhost:3000/toys/${toyObj.id}`, {
        method: "PATCH",
        headers: {
          'Accept': 'application/json', //i am expecting JSON back
          'Content-Type': 'application/json' //i am sending you JSON
        },
        body: JSON.stringify({
          likes: toyObj.likes
        })
      })
      console.log(toyObj);

      let likeP = document.getElementById(`toy-${toyObj.id}`)
      likeP.innerText = `${toyObj.likes} likes`
    })
  // }
})
})
