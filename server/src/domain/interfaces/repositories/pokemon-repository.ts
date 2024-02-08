import { PokemonModel, PokemonForTrainerModel } from "../../models/pokemon";

export interface PokemonRepository {
  getPokemons: (
    pokemonLimit: number,
    pokemonOffset: number
  ) => Promise<PokemonModel[]>;
  savePokemons: (email: string, pokemons: number[]) => Promise<boolean>;
  searchPokemon: (pokemonName: string) => Promise<PokemonModel | null>;
  getTrainerPokemons: (
    pokemonTrainer: string
  ) => Promise<PokemonForTrainerModel>;
}
