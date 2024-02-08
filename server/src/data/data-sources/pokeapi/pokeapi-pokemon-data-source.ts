import { PokemonModel, PokemonUrlModel } from "../../../domain/models/pokemon";
import { PokemonAPIDataSource } from "../../interfaces/pokemon-data-source";

export class PokeAPIPokemonDataSource implements PokemonAPIDataSource {
  async getPokemonsURLs(
    pokemonLimit: number,
    pokemonOffset: number
  ): Promise<PokemonUrlModel[]> {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=${pokemonLimit}&offset=${pokemonOffset}`
      );
      const data = await response.json();

      const pokemonsURLs: PokemonUrlModel[] = data.results.map(
        (pokemon: any) => {
          const urlRegexId = /\/(\d+)\/$/;
          const match = pokemon.url.match(urlRegexId);
          const id = match ? parseInt(match[1]) : null;

          return {
            id: id,
            url: pokemon.url,
          };
        }
      );

      return pokemonsURLs;
    } catch (error) {
      console.error("Error fetching data => getPokemonsURLs ", error);
      return [];
    }
  }

  async getPokemonsFromURLs(
    pokemonURLs: PokemonUrlModel[]
  ): Promise<PokemonModel[]> {
    try {
      const pokemonPromises = pokemonURLs.map(
        async (pokemon: PokemonUrlModel) => {
          const response = await fetch(pokemon.url);
          return response.json();
        }
      );

      const pokemonsData = await Promise.all(pokemonPromises);

      const pokemons: PokemonModel[] = pokemonsData.map((pokemon: any) => {
        return {
          id: pokemon.id,
          name: pokemon.name,
          abilities: pokemon.abilities.map(
            (ability: any) => ability.ability.name
          ),
          height: pokemon.height,
          weight: pokemon.weight,
          front_sprite: pokemon.sprites.front_default,
          back_sprite: pokemon.sprites.back_default,
          types: pokemon.types.map((type: any) => type.type.name),
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
    } catch (error) {
      console.error("Error fetching data => getPokemonsFromURLs ", error);
      return [];
    }
  }

  async searchPokemon(pokemonName: string): Promise<PokemonModel | null> {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
      );
      if (response.status === 404) return null;

      const pokemonData = await response.json();

      const pokemon: PokemonModel = {
        id: pokemonData.id,
        name: pokemonData.name,
        abilities: pokemonData.abilities.map(
          (ability: any) => ability.ability.name
        ),
        height: pokemonData.height,
        weight: pokemonData.weight,
        front_sprite: pokemonData.sprites.front_default,
        back_sprite: pokemonData.sprites.back_default,
        types: pokemonData.types.map((type: any) => type.type.name),
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
    } catch (error) {
      console.error("Error fetching data => searchPokemon ", error);
      return null;
    }
  }
}
