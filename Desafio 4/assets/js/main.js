let offset = 0;
function convertPokemonToLi(response) {
  return `<li onclick="abrirCard(this.id)" id=${response.id} class="pokemon ${
    response.principalType
  }">
    <span class="number">#${response.id}</span>
    <span class="name">${response.name}</span>

    <div class="detail">
        <ol class="types">
        ${response.types
          .map((type) => `<li class="type">${type}</li>`)
          .join("")}
        </ol>

        <img width=${response.height} src="${response.img}"
            alt="${response.name}">
    </div>
</li>`;
}

const pokemonList = document.getElementById("pokemonList");
carregaLista();

function carregaLista(){
  pokeApi.getPokemons(offset, 10).then((response = []) => {
    const newList = response.map(convertPokemonToLi).join("");
    pokemonList.innerHTML = newList;
  });
}

function abrirCard(id) {
  const pokemon1 = document.getElementById("pokemon1");
  pokeApi.getPokemons(id - 1, 1).then((response = []) => {
    const newList = response.map(convertPokemonDetail).join("");
    pokemon1.innerHTML = newList;
  });
  pokemon1.style.visibility = "visible";
}

function convertPokemonDetail(response) {
  return `<h2>${response.name}</h2>
  <div class="card-types">
      <ol class="types">
      ${response.types
        .map((type) => `<li class="type ${type}">${type}</li>`)
        .join("")}
      </ol>
      <img class="card-pokemon-img" src="${response.img}" alt="imagem do pokemon" width=${response.height}>

  </div>
  ${response.stats
    .map((stats) => `
      <div class="slidecontainer">
        <span class="stats">
          ${stats.stat.name}
        </span>
        <input 
          type="range" 
          min="1" 
          max="100" 
          value="${stats.base_stat}" 
          class="slider" 
          style="background-image: linear-gradient(to right, yellow 0%, yellow ${stats.base_stat}%, rgb(206, 206, 206) ${stats.base_stat}%, rgb(206, 206, 206) 100%)">
        <span class="value">
          ${stats.base_stat}
        </span> 
      </div>`)
    .join("")}`;
}

function previous(){
  if(offset<=9)
    offset = 0
  else 
    offset-=10

  carregaLista()
}
function next(){
  if(offset>=1144)
    offset = 1154
  else
    offset+=10

  carregaLista()
}
