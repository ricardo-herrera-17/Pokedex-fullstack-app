import { PokemonTrainerRequestModel } from "../../models/pokemon-trainer";

export interface GetTrainerUseCase {
  execute: (
    pokemonTrainer: PokemonTrainerRequestModel
  ) => Promise<PokemonTrainerRequestModel | null>;
}
