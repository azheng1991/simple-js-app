var pokemonRepository = (function() {    
  var apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
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
  //Function to load pokemon list from API
  function loadList() {
    return fetch(apiUrl).then(function(response) {
      return response.json();
    }).then(function(json) {
      json.results.forEach(function(item) {
        var pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function(e) {
      console.error(e);
    })
  }

  //function to load details of the list from API
  function loadDetails(item) {
    var url = item.detailsUrl;
    return fetch(url).then(function(response) {
      return response.json();
    }).then(function(details) {
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.weight = details.weight;
      item.types = Object.keys(details.types);
    }).catch(function(e) {
      console.error(e);
    })
  }

   //Function to show details of each Pokemon
   function showDetails(item) {
    pokemonRepository.loadDetails(item).then(function() {
    console.log(item);
    return item;
    })
    }

  return{
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails,
    loadList: loadList,
    loadDetails: loadDetails,
  };
})();

//Creates list of Pokemon with Pokemon's name on the button
pokemonRepository.loadList().then(function() {
   // Now the data is loaded!
   pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});
