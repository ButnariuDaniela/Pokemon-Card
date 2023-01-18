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
    let inputValue = document.getElementById('search-input').value;
    const url = `https://pokeapi.co/api/v2/pokemon/${inputValue}`;

    fetch(url)
    .then(res => res.json())
    .then(pokemon => {
        const urlFirst = pokemon.abilities[0].ability.url;
        fetch (urlFirst)
        .then(res => res.json())
        .then(pokemonA => {
            let indexA = 0;
            lenghtA = pokemonA.effect_entries.length;
            for (let i=0; i<lenghtA; i++) {
                if (pokemonA.effect_entries[i].language.name == 'en') {
                    indexA = i;
                }
            }
            descriptionFirst = pokemonA.effect_entries[indexA].effect;
            if(descriptionFirst.length > 240) descriptionFirst = descriptionFirst.substring(0,240)+"...";
            firstAbilityDescription.innerHTML = descriptionFirst;
     
        })
        .catch(error => console.log(error))
        const urlSecond = pokemon.abilities[1].ability.url;
        fetch (urlSecond)
        .then(res => res.json())
        .then(pokemonB => {
            let indexB = 0;
            lenghtB = pokemonB.effect_entries.length;
            for (let i=0; i<lenghtB; i++) {
                if (pokemonB.effect_entries[i].language.name == 'en') {
                    indexB = i;
                }
            }
            descriptionSecond = pokemonB.effect_entries[indexB].effect;
            if(descriptionSecond.length > 240) descriptionSecond = descriptionSecond.substring(0,240)+"...";
            secondAbilityDescription.innerHTML = descriptionSecond;
        })
        .catch(error => console.log(error))
        let type = pokemon.types[0].type.name;
        let root =  `images/${type}.jpg`;
        document.getElementById("card").style.backgroundImage = `url(${root})`;
        imgIcons.src = `icons/${pokemon.types[0].type.name}.jpg`;
        imgPokemon.src = pokemon.sprites.other.dream_world.front_default;
        pokemonName.innerHTML =  pokemon.forms[0].name.toUpperCase();
        pokemonHp.innerHTML = `HP: ${pokemon.stats[0].base_stat}`;
        attack.innerHTML = `attack: ${pokemon.stats[1].base_stat}`;
        defence.innerHTML = `defence: ${pokemon.stats[2].base_stat}`;
        speed.innerHTML = `speed: ${pokemon.stats[5].base_stat}`;
        pokemonType.innerHTML = `Type: ${type}`;
        pokemonHeight.innerHTML = `Height: ${Number(pokemon.height)/10} m`;
        pokemonWeight.innerHTML = `Weight: ${Number(pokemon.weight)/10} kg`;
        firstAbilityName.innerText = `1. ${pokemon.abilities[0].ability.name}`;
        secondAbilityName.innerHTML = `2. ${pokemon.abilities[1].ability.name}`;       
    })
    .catch(error => console.log(error))
}

butonSearch.addEventListener('click', getValue);

