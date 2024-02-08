import {
  PokemonModel,
  PokemonUrlModel,
  PokemonForTrainerModel,
} from "../models/pokemon";
import { PokemonRepository } from "../interfaces/repositories/pokemon-repository";
import {
  PokemonAPIDataSource,
  PokemonDataSource,
} from "../../data/interfaces/pokemon-data-source";

export class PokemonRepositoryImpl implements PokemonRepository {
  pokemonAPIDataSource: PokemonAPIDataSource;
  pokemonDataSource: PokemonDataSource;
  constructor(
    pokemonAPIDataSource: PokemonAPIDataSource,
    pokemonDataSource: PokemonDataSource
  ) {
    this.pokemonAPIDataSource = pokemonAPIDataSource;
    this.pokemonDataSource = pokemonDataSource;
  }

  async getPokemons(
    pokemonLimit: number,
    pokemonOffset: number
  ): Promise<PokemonModel[]> {
    try {
      const pokemonsURLs: PokemonUrlModel[] =
        await this.pokemonAPIDataSource.getPokemonsURLs(
          pokemonLimit,
          pokemonOffset
        );

      const pokemons: PokemonModel[] =
        await this.pokemonAPIDataSource.getPokemonsFromURLs(pokemonsURLs);

      return pokemons;
    } catch (error) {
      console.error("Error fetching data => getPokemons ", error);
      return [];
    }
  }

  async savePokemons(email: string, pokemons: number[]): Promise<boolean> {
    try {
      return await this.pokemonDataSource.saveTrainerPokemons(email, pokemons);
    } catch (error) {
      console.error("Error saving trainer pokemons => savePokemons ", error);
      return false;
    }
  }

  async searchPokemon(pokemonName: string): Promise<PokemonModel | null> {
    try {
      return await this.pokemonAPIDataSource.searchPokemon(pokemonName);
    } catch (error) {
      console.error("Error searching pokemon => searchPokemon ", error);
      return null;
    }
  }

  async getTrainerPokemons(
    pokemonTrainer: string
  ): Promise<PokemonForTrainerModel> {
    try {
      const pokemonIds: number[] =
        await this.pokemonDataSource.getTrainerPokemons(pokemonTrainer);

      if (!pokemonIds) return null;
      const pokemonURLs: PokemonUrlModel[] = pokemonIds.map(
        (pokemonId: number) => {
          return {
            id: pokemonId,
            url: `https://pokeapi.co/api/v2/pokemon/${pokemonId}/`,
          };
        }
      );

      const pokemons: PokemonModel[] =
        await this.pokemonAPIDataSource.getPokemonsFromURLs(pokemonURLs);

      return pokemons;
    } catch (error) {
      console.error("Error fetching data => getPokemons ", error);
      return [];
    }
  }
}
