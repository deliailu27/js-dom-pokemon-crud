

const pokeForm = document.querySelector(".poke-form");
const pokeList = document.querySelector(".poke-list");




function addPokemon(pokemons) {
  
  pokemons.forEach(pokemon => {


    const liEl = document.createElement("li");
    const imgEl = document.createElement("img");
    const h2El = document.createElement("h2");

    liEl.classList ="pokemon";
    imgEl.src = pokemon.image;
    h2El.innerText = pokemon.name;

    liEl.appendChild(imgEl);
    liEl.appendChild(h2El)
    pokeList.appendChild(liEl);})
  
}

//function addPokemons(pokemons) {
//  pokemons.forEach(pokemon => addPokemon(pokemon))
//}
function deletePokemon(pokemon){
  fetch('http://localhost:3000/pokemons',{
    method:"DELETE",
    header:{'Content-type':"application/json"},
    body: JSON.stringify(pokemon)
  })
  .then(res=>res.json())
  

}

function listenToAddPokemonForm() {
  pokeForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const pokemon = {
      name: pokeForm.name.value,
      image: pokeForm.image.value
    };

     
     fetch("http://localhost:3000/pokemons", {
       method: "POST",
       headers: {
         "Content-Type": "application/json"
       },
       body: JSON.stringify(pokemon)
     })
       .then(res =>  res.json())
       .then(pokemon => addPokemon(pokemon));
       });

    pokeForm.reset();
  
}

function init() {
  
  fetch("http://localhost:3000/pokemons")
    .then(res => res.json())
    .then(pokemons => addPokemon(pokemons));

    listenToAddPokemonForm()
}

init();

