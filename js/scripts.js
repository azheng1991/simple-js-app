
var pokemonList = [
{ name: 'bulbasaur', height: 0.7, types: ['grass', 'poison']},
{ name: 'charmander', height: 0.6, types: ['fire']},
{ name: 'squirtle', height: 0.5, types: ['water']}
]


pokemonList.forEach(function(pokemon) {
  document.write(`<h2>${pokemonList[i].name}</h2> Height: ${pokemonList[i].height}`);
if (pokemonList[i].types.length > 1) {
  document.write('<h3>' + 'Wow, that\'s a lot of types!' + '</h3>')
  }
}
