"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PokeAPIPokemonDataSource = void 0;
class PokeAPIPokemonDataSource {
    getPokemonsURLs(pokemonLimit, pokemonOffset) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch(`https://pokeapi.co/api/v2/pokemon?limit=${pokemonLimit}&offset=${pokemonOffset}`);
                const data = yield response.json();
                const pokemonsURLs = data.results.map((pokemon) => {
                    const urlRegexId = /\/(\d+)\/$/;
                    const match = pokemon.url.match(urlRegexId);
                    const id = match ? parseInt(match[1]) : null;
                    return {
                        id: id,
                        url: pokemon.url,
                    };
                });
                return pokemonsURLs;
            }
            catch (error) {
                console.error("Error fetching data => getPokemonsURLs ", error);
                return [];
            }
        });
    }
    getPokemonsFromURLs(pokemonURLs) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const pokemonPromises = pokemonURLs.map((pokemon) => __awaiter(this, void 0, void 0, function* () {
                    const response = yield fetch(pokemon.url);
                    return response.json();
                }));
                const pokemonsData = yield Promise.all(pokemonPromises);
                const pokemons = pokemonsData.map((pokemon) => {
                    return {
                        id: pokemon.id,
                        name: pokemon.name,
                        abilities: pokemon.abilities.map((ability) => ability.ability.name),
                        height: pokemon.height,
                        weight: pokemon.weight,
                        front_sprite: pokemon.sprites.front_default,
                        back_sprite: pokemon.sprites.back_default,
                        types: pokemon.types.map((type) => type.type.name),
                        stats: {
                            hp: pokemon.stats[0].base_stat,
                            attack: pokemon.stats[1].base_stat,
                            defense: pokemon.stats[2].base_stat,
                            special_attack: pokemon.stats[3].base_stat,
                            special_defense: pokemon.stats[4].base_stat,
                            speed: pokemon.stats[5].base_stat,
                        },
                    };
                });
                return pokemons;
            }
            catch (error) {
                console.error("Error fetching data => getPokemonsFromURLs ", error);
                return [];
            }
        });
    }
    searchPokemon(pokemonName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
                if (response.status === 404)
                    return null;
                const pokemonData = yield response.json();
                const pokemon = {
                    id: pokemonData.id,
                    name: pokemonData.name,
                    abilities: pokemonData.abilities.map((ability) => ability.ability.name),
                    height: pokemonData.height,
                    weight: pokemonData.weight,
                    front_sprite: pokemonData.sprites.front_default,
                    back_sprite: pokemonData.sprites.back_default,
                    types: pokemonData.types.map((type) => type.type.name),
                    stats: {
                        hp: pokemonData.stats[0].base_stat,
                        attack: pokemonData.stats[1].base_stat,
                        defense: pokemonData.stats[2].base_stat,
                        special_attack: pokemonData.stats[3].base_stat,
                        special_defense: pokemonData.stats[4].base_stat,
                        speed: pokemonData.stats[5].base_stat,
                    },
                };
                return pokemon;
            }
            catch (error) {
                console.error("Error fetching data => searchPokemon ", error);
                return null;
            }
        });
    }
}
exports.PokeAPIPokemonDataSource = PokeAPIPokemonDataSource;
