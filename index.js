import { pokeApi } from './api/index.js';

class State {
    constructor(defaultState) {
        this.pokemon = defaultState || [];
    }

    set(newState) {
        this.pokemon = newState;
    }

    get() {
        return this.pokemon;
    }
}

// Elements
const searchForm = document.getElementById('search');
const infoDiv = document.getElementById('pokemonInfo');
const name = document.getElementById('name');
const image = document.getElementById('image');

infoDiv.style.display = 'none';

const pokemon = new State();

const display = async () => {
    displayPokemon();
    displayStats();
    displayMoves();
    displayAbilities();
}

const displayPokemon = async () => {
    infoDiv.style.display = 'block';

    name.innerHTML = `${pokemon.get().name} (${pokemon.get().id})`;
    image.src = pokemon.get().sprites.front_default;
}

const displayStats = async () => {
    const stats = pokemon.get().stats;
    stats.push({
        stat: {
            name: "base-XP"
        },
        base_stat: pokemon.get().base_experience
    });
    const statsDiv = document.getElementById('stats');
    statsDiv.innerHTML = '';

    stats.forEach(stat => {
        const statElement = document.createElement('li');
        statElement.className = 'stat';
        statElement.innerHTML = `${stat.stat.name}: ${stat.base_stat}`;
        statsDiv.appendChild(statElement);
    })
}

const displayMoves = async () => {
    const moves = pokemon.get().moves;
    const movesDiv = document.getElementById('moves');
    movesDiv.innerHTML = '';

    moves.forEach(move => {
        const moveElement = document.createElement('li');
        moveElement.className = 'move';
        moveElement.innerHTML = move.move.name;
        movesDiv.appendChild(moveElement);
    })
}

const displayAbilities = async () => {
    const abilities = pokemon.get().abilities;
    const abilitiesDiv = document.getElementById('abilities');
    abilitiesDiv.innerHTML = '';

    abilities.forEach(ability => {
        const abilityElement = document.createElement('li');
        abilityElement.className = 'ability';
        abilityElement.innerHTML = ability.ability.name;
        abilitiesDiv.appendChild(abilityElement);
    })
}

searchForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const input = e.target[0].value

    pokemon.set(await pokeApi.getPokemon(input.toLowerCase()));

    if (pokemon.get()) {
        if(!pokemon.get().error) {
            display();
        } else {
            alert(pokemon.get().message);
        }
    }
});
    

