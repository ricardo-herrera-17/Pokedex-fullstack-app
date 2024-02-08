import { PokemonTrainerRequestModel } from "../../models/pokemon-trainer";
import { PokemonTrainerRepository } from "../../interfaces/repositories/pokemon-trainer-repository";
import { SetTrainerUseCase } from "../../interfaces/use-cases/set-trainer-use-case";

export class SetTrainer implements SetTrainerUseCase {
  pokemonTrainerRepository: PokemonTrainerRepository;
  constructor(pokemonTrainerRepository: PokemonTrainerRepository) {
    this.pokemonTrainerRepository = pokemonTrainerRepository;
  }

  async execute(
    pokemonTrainer: PokemonTrainerRequestModel
  ): Promise<PokemonTrainerRequestModel | null> {
    return this.pokemonTrainerRepository.setTrainer(pokemonTrainer);
  }
}
