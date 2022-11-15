

const pokeApi = {}

function newPokemon(pokemonDetail){
    const pokemon = new Pokemon()

    pokemon.id = pokemonDetail.id
    pokemon.name = pokemonDetail.name
    pokemon.types = pokemonDetail.types.map((typeSlot) => typeSlot.type.name)
    pokemon.principalType = pokemon.types[0]
    pokemon.img = pokemonDetail.sprites.other.dream_world.front_default
    pokemon.height = pokemonDetail.height*15
    pokemon.stats = pokemonDetail.stats

    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(newPokemon)
}

pokeApi.getPokemons = (offset, limit) => {
    const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`;
    return fetch(url)
        .then((response) => response.json())
        .then((response) => response.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequest) => Promise.all(detailRequest))
        .catch((error) => console.error(error))
}