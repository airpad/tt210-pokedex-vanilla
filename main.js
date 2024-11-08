const pokemonList = document.getElementById("pokemon-list")
const pokemonDetail = document.getElementById("pokemon-detail")
const pokemonInfo = document.getElementById("pokemon-info")
const backButton = document.getElementById("back-button")

async function fetchPokemonData(pokemonId) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
    const pokemon = await response.json()
    return pokemon
}

function displayPokemon(pokemon){
    const pokemonCard = document.createElement("div")
    pokemonCard.classList.add("pokemon-card")
    pokemonCard.innerHTML = `
    <img src = "${pokemon.sprites.front_default}" alt="${pokemon.name}">
    <h3>${pokemon.name.toUpperCase()}</h3>
    <p>ID: ${pokemon.id}</p>
    `
    //linea para mostrar detalle de pokemon
    pokemonCard.addEventListener("click",()=>showPokemonDetail(pokemon))
    pokemonList.appendChild(pokemonCard)
    return
}
backButton.addEventListener("click",()=>{
    pokemonDetail.style.display = "none"
    pokemonList.style.display = "grid"
})
function showPokemonDetail(pokemon){
    pokemonList.style.display = "none"
    pokemonDetail.style.display = "block"
    pokemonInfo.innerHTML =`
    <h2>${pokemon.name}</h2>
    <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" >
    <p>ID: ${pokemon.id} </p>
    <p>Altura: ${pokemon.height} m</p>
    <p>Peso: ${pokemon.weight} kg</p>
    <p>Tipos: ${pokemon.types.map(p=>p.type.name).join(", ")}</p>
    `
    return
}


async function loadPokedex() {
    for (let i=1; i<=50; i++){
        const pokemon = await fetchPokemonData(i)
        displayPokemon(pokemon)
    }
    return
}

loadPokedex()