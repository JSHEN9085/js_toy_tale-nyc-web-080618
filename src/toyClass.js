class Toy {
  constructor(toyJSONObject){
    this.id = toyJSONObject.id;
    this.name = toyJSONObject.name;
    this.image = toyJSONObject.image;
    this.likes = toyJSONObject.likes;
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
