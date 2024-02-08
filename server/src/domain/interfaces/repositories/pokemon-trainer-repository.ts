import { PokemonTrainerRequestModel } from "../../models/pokemon-trainer";

export interface PokemonTrainerRepository {
  getTrainer: (
    pokemonTrainer: PokemonTrainerRequestModel
  ) => Promise<PokemonTrainerRequestModel | null>;
  setTrainer: (
    pokemonTrainer: PokemonTrainerRequestModel
  ) => Promise<PokemonTrainerRequestModel | null>;
}
