
var pokemonList = [
{ name: 'bulbasaur', height: 0.7, types: ['grass', 'poison']},
{ name: 'charmander', height: 0.6, types: ['fire']},
{ name: 'squirtle', height: 0.5, types: ['water']}
]


pokemonList.forEach(function(pokemonList) {
  document.write('<h2>' + pokemonList.name + '</h2>' + ' Height: ' + pokemonList.height);
});
