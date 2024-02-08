import { PokemonModel, PokemonUrlModel } from "../../domain/models/pokemon";

export interface PokemonAPIDataSource {
  getPokemonsURLs: (
    pokemonLimit: number,
    pokemonOffset: number
  ) => Promise<PokemonUrlModel[]>;
  getPokemonsFromURLs: (
    pokemonURLs: PokemonUrlModel[]
  ) => Promise<PokemonModel[]>;
  searchPokemon: (pokemonName: string) => Promise<PokemonModel | null>;
}

export interface PokemonDataSource {
  saveTrainerPokemons: (
    trainerEmail: string,
    pokemons: number[]
  ) => Promise<boolean>;
  getTrainerPokemons: (trainerEmail: string) => Promise<number[]>;
}
