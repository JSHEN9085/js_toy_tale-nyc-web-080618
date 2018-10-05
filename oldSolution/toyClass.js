class Toy {
  constructor(toy){
    this.id = toy.id;
    this.name = toy.name;
    this.image = toy.image;
    this.likes = toy.likes;
  }

  render(){
    return `<div class="card" >
      <h2>${this.name}</h2>
      <img src=${this.image} class="toy-avatar">
      <p id="toy-${this.id}"> ${this.likes} likes<p>
      <button class="like-btn" id="${this.name}">Like <3</button>
      </div>`
  }
}
