const butonSearch = document.querySelector('#search');
const backgroundCard = document.querySelector('.card');
const imgIcons = document.querySelector("#icon");
const imgPokemon = document.querySelector("#pokemon-img");
const pokemonName = document.querySelector("#pokemon-name");
const pokemonHp = document.querySelector("#pokemon-hp");
const pokemonType = document.querySelector("#pokemon-type");
const pokemonHeight = document.querySelector("#pokemon-height");
const pokemonWeight = document.querySelector("#pokemon-weight");
const firstAbilityName = document.querySelector('#first-ability');
const secondAbilityName = document.querySelector('#second-ability');
const firstAbilityDescription = document.querySelector("#first-description");
const secondAbilityDescription = document.querySelector("#second-description");
const attack = document.querySelector("#attack");
const defence = document.querySelector("#defence");
const speed = document.querySelector("#speed");

function getValue() {  
    getData();
}

async function fetchWrapper(url){
    const response = await fetch(url);
    return await response.json();
}

const descriptionAbilities = []
async function getData(){
    try{
        let inputValue = document.getElementById('search-input').value;
    const url = `https://pokeapi.co/api/v2/pokemon/${inputValue}`;
    const pokemonData = await fetchWrapper(url);
    const abilities = [pokemonData.abilities[0].ability.url, pokemonData.abilities[1].ability.url];
    const promises = [];
    abilities.forEach(url => {
        const promise = fetchWrapper(url);
        promises.push(promise)
    });
    const data = await Promise.all(promises)
    data.forEach(data => {
        let indexA = 0;
        lenghtA = data.effect_entries.length;
        for (let i = 0; i < lenghtA; i++) {
            if (data.effect_entries[i].language.name == 'en') {
                indexA = i;
                let descriptionAbility = data.effect_entries[indexA].effect;
                if(descriptionAbility.length > 240) descriptionAbility = descriptionAbility.substring(0,240)+"...";
                descriptionAbilities.push(descriptionAbility)
            }       
        }          
    })
    firstAbilityDescription.innerHTML = descriptionAbilities[0];
    secondAbilityDescription.innerHTML = descriptionAbilities[1];
    let type = pokemonData.types[0].type.name;
    let root =  `images/${type}.jpg`;
    document.getElementById("card").style.backgroundImage = `url(${root})`;
    imgIcons.src = `icons/${pokemonData.types[0].type.name}.jpg`;
    imgPokemon.src = pokemonData.sprites.other.dream_world.front_default;
    pokemonName.innerHTML =  pokemonData.forms[0].name.toUpperCase();
    pokemonHp.innerHTML = `HP: ${pokemonData.stats[0].base_stat}`;
    attack.innerHTML = `attack: ${pokemonData.stats[1].base_stat}`;
    defence.innerHTML = `defence: ${pokemonData.stats[2].base_stat}`;
    speed.innerHTML = `speed: ${pokemonData.stats[5].base_stat}`;
    pokemonType.innerHTML = `Type: ${type}`;
    pokemonHeight.innerHTML = `Height: ${Number(pokemonData.height)/10} m`;
    pokemonWeight.innerHTML = `Weight: ${Number(pokemonData.weight)/10} kg`;
    firstAbilityName.innerText = `1. ${pokemonData.abilities[0].ability.name}`;
    secondAbilityName.innerHTML = `2. ${pokemonData.abilities[1].ability.name}`;
    }catch {
        error => console.log(error);
    }  
}

butonSearch.addEventListener('click', getValue);