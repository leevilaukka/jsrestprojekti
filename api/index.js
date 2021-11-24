const pokeApi = {
    getPokemon: async function(name) {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
            const data = await response.json();

            if(!data.name) throw new Error('Pokemon not found'); 
            
            return data;

        } catch (error) {
            return {
                error,
                message: `Pokemon "${name}" not found`
            };
        }
    },
    getAbilities: async function(name) {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`);
            const data = await response.json();

            if(!data.abilities) throw new Error('Pokemon not found');

            return data.abilities.map(ability => ability.ability.name);
        } catch (error) {
            return {
                error,
                message: `Pokemon "${name}" not found`
            };
        }
    }    
}
export {pokeApi}