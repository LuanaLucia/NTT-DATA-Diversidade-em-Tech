
const offset = 0;
const limit = 10;
const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`;

function convertPokemonToLi(response){
    return `<li class="pokemon">
    <span class="number">#001</span>
    <span class="name">${response.name}</span>

    <div class="detail">
        <ol class="types">
            <li class="type">grass</li>
            <li class="type">poison</li>
        </ol>

        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg"
            alt="${response.name}">
    </div>
</li>`
}

const pokemonList = document.getElementById('pokemonList');

fetch(url)
    .then((response) => response.json())
    .then((response) => response.results)
    .then((response) => {
        for(let i=0;i<response.length;i++){
            const pokemon = response[i];
            pokemonList.innerHTML += convertPokemonToLi(pokemon);
            console.log(pokemon);

        }

    })
    .catch((error) => console.log(error))
    .finally(() => {

    });