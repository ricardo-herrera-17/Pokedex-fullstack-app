import { PokemonTrainerRequestModel } from "../../models/pokemon-trainer";

export interface SetTrainerUseCase {
  execute: (
    pokemonTrainer: PokemonTrainerRequestModel
  ) => Promise<PokemonTrainerRequestModel | null>;
}
