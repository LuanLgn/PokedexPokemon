////////////////////// Variaveis Globais ///////////////////////////
const pokemonName = document.querySelector('.pokemon-name');
const pokemonNumber = document.querySelector('.pokemon-number');
const pokemonImage = document.querySelector('.pokemon-image');
const form = document.querySelector('.form');
const input = document.querySelector('.input-search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');
////////////////////////////////////////////////////////////////////

let searchPokemon = 1; //Começar sempre do id 1


//Pesquisar o pokemon na API e retornar o valor das informações na variavel data
const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if(APIResponse.status == 200){
        const data = await APIResponse.json();
        return data;
    }

   
}

//Renderizar as informações do pokemon com base no que foi pesquisado
const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Loading...';
    pokemonNumber.innerHTML = '';

    const data = await fetchPokemon(pokemon);

    //Se data = true, renderiza as informações do pokemon
    if(data){
        pokemonName.innerHTML = data.name; //Nome do pokemon
        pokemonNumber.innerHTML = data.id; //Id da pokedex
        pokemonImage.style.display = 'block';
        pokemonImage.src = data.sprites.versions['generation-v']['black-white'].animated['front_default']; // Imagem do pokemon
        input.value = '';        
        searchPokemon = data.id; //Atualizar o valor do search para o pokemon que foi pesquisado
    } else {
        pokemonName.innerHTML = 'Not found :c';
        pokemonNumber.innerHTML = '';
        pokemonImage.style.display = 'none';
    }
   
}

//Form para enviar os valores
form.addEventListener('submit', (event) => {

    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
    
});

//Botão de Preview
buttonPrev.addEventListener('click', (eent) => {

    searchPokemon -= 1;
    renderPokemon(searchPokemon);

    if(searchPokemon <= 0){
        searchPokemon = 1;
        renderPokemon(searchPokemon);
    }
    
});

//Botão de Next
buttonNext.addEventListener('click', () => {

    searchPokemon += 1;
    renderPokemon(searchPokemon);
    
});

//Inicializar a Página com o pokemon de id 1
renderPokemon(searchPokemon);