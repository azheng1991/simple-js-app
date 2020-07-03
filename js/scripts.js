var pokemonRepository = (function() {    //Start of IIFE
  var repository = [
  { name: 'bulbasaur', height: 0.7, types: ['grass', 'poison']},
  { name: 'charmander', height: 0.6, types: ['fire']},
  { name: 'squirtle', height: 0.5, types: ['water']}
  ];

  var $pokemonList = document.querySelector('ul');

  //Function to add new Pokemon data
  function add(pokemon) {
    repository.push(pokemon);
    }


  //Function to pull all Pokemon data
  function getAll() {
    return repository;
  }

  //Function to add list for each pokemon object
  function addListItem(pokemon) {
    var listItem = document.createElement('li');
    var button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('pokemon-name');
    listItem.appendChild(button);
    $pokemonList.appendChild(listItem)
    button.addEventListener('click', function() {
      showDetails(pokemon)
    })
  }

   //Function to show details of each Pokemon
   function showDetails(pokemon) {
      console.log(pokemon)
   }

  return{
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails,
  };
})();

pokemonRepository.getAll().forEach(function(pokemon){
  pokemonRepository.addListItem(pokemon);
});
