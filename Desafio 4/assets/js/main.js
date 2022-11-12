function convertPokemonToLi(response) {
  return `<li class="pokemon ${response.principalType}">
    <span class="number">#${response.id}</span>
    <span class="name">${response.name}</span>

    <div class="detail">
        <ol class="types">
        ${response.types.map((type) => `<li class="type">${type}</li>`).join('')}
        </ol>

        <img src="${response.img}"
            alt="${response.name}">
    </div>
</li>`;
}

const pokemonList = document.getElementById("pokemonList");

pokeApi.getPokemons().then((response = []) => {
    const newList = response.map(convertPokemonToLi).join('');
    pokemonList.innerHTML = newList
});

