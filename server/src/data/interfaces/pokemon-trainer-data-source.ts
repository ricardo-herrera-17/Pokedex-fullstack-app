import { PokemonTrainerRequestModel } from "../../domain/models/pokemon-trainer";

export interface PokemonTrainerDataSource {
  findOneTrainer: (
    pokemonTrainer: PokemonTrainerRequestModel
  ) => Promise<PokemonTrainerRequestModel | null>;
  saveNewTrainer: (
    pokemonTrainer: PokemonTrainerRequestModel
  ) => Promise<PokemonTrainerRequestModel | null>;
  saveTrainerPokemons: (
    trainerEmail: string,
    pokemons: number[]
  ) => Promise<boolean>;
}
