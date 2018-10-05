const Toy = (() => {

  const allToys = [];

  return class {
    constructor(toy){
      this.id = toy.id;
      this.name = toy.name;
      this.image = toy.image;
      this.likes = toy.likes;
      allToys.push(this)
    }

    render(){
      return `<div data-id="${this.id}" class="card">
        <h2>${this.name}</h2>
        <img src=${this.image} class="toy-avatar">
        <p id="like-${this.id}">${this.likes} Likes <p>
        <button id="like-btn-${this.id}" class="like-btn">Like <3</button>
        <br>
        <br>
        <button id="delete-btn-${this.id}" class="delete-btn">Delete</button>
      </div>`
    }

    static findById(toyId){
      return allToys.find(toy => toy.id == toyId)
    }
  }
})()
