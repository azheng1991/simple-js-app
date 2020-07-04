var pokemonRepository = (function () {
  var repository = [];
  var apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';


  //function to add pokemon to pokedex
  function add(pokemon) {
      repository.push(pokemon);
  }

  //Function to pull all pokemon data
  function getAll() {
      return repository;
  }

  //Function to create a list of pokemon from API
  function addListItem(pokemon) {
      var $pokemonList = document.querySelector('ul');
      var listItem = document.createElement('li');
      var button = document.createElement('button');
      button.innerText = pokemon.name;
      button.classList.add('list-button');
      listItem.appendChild(button);
      $pokemonList.appendChild(listItem);
      button.addEventListener('click', function (event) {
          showDetails(pokemon);
      })
  }

  //Function to load pokemon list from API
  function loadList() {
      return fetch(apiUrl).then(function (response) {
          return response.json();
      }).then(function (json) {
          json.results.forEach(function (item) {
              var pokemon = {
                  name: item.name,
                  detailsUrl: item.url
              };
              add(pokemon);
          });
      }).catch(function (e) {
          console.error(e);
      })
  }

  // Function to load details for each pokemon:
  function loadDetails(item) {
      var url = item.detailsUrl;
      return fetch(url).then(function (response) {
          return response.json();
      }).then(function (details) {
          item.imageUrl = details.sprites.front_default;
          item.height = details.height;
      }).catch(function (error) {
          console.error(error);
      });
  }

  // Function to show pokemon details
  function showDetails(item) {
      pokemonRepository.loadDetails(item).then(function () {
          showModal(item);
      });
  }

  //Function to show modal
  function showModal(item) {
      var $modalContainer = document.querySelector('#modal-container');
      // Clears existing modal
      $modalContainer.innerHTML = '';
      // Creats div element in DOM
      var modal = document.createElement('div');
      // Adds class to div DOM element
      modal.classList.add('modal');
      // Creates closing button in modal content
      var closeButtonElement = document.createElement('button');
      closeButtonElement.classList.add('modal-close');
      closeButtonElement.innerText = 'Close';
      // Adds event listener to close modal when button is clicked
      closeButtonElement.addEventListener('click', hideModal);
      // Creates element for name in modal content
      var nameElement = document.createElement('h1');
      nameElement.innerText = item.name;
      // Creates img in modal
      var imageElement = document.createElement('img');
      imageElement.classList.add('modal-img');
      imageElement.setAttribute('src', item.imageUrl);
      // Creates element for height in modal content
      var heightElement = document.createElement('p');
      heightElement.innerText = 'height : ' + item.height + 'm';

      // Appends modal content to webpage
      modal.appendChild(closeButtonElement);
      modal.appendChild(nameElement);
      modal.appendChild(imageElement);
      modal.appendChild(heightElement);
      $modalContainer.appendChild(modal);

      // Adds class to show modal
      $modalContainer.classList.add('is-visible');
  }

  // Hides modal with close button click
  function hideModal() {
      var $modalContainer = document.querySelector('#modal-container');
      $modalContainer.classList.remove('is-visible');
  }

  // Hides model with ESC key
  window.addEventListener('keydown', e => {
      var $modalContainer = document.querySelector('#modal-container');
      if (
          e.key === 'Escape' &&
          $modalContainer.classList.contains('is-visible')
      ) {
          hideModal();
      }
  });

  // Hides modal with click in overlay
  var $modalContainer = document.querySelector('#modal-container');
  $modalContainer.addEventListener('click', e => {
      var target = e.target;
      if (target === $modalContainer) {
          hideModal();
      }
  });

  return {
      add: add,
      getAll: getAll,
      addListItem: addListItem,
      loadList: loadList,
      loadDetails: loadDetails,
      showDetails: showDetails
  };
})();

// Creates list of pokemon with their name on the button
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
      pokemonRepository.addListItem(pokemon);
  });
});
