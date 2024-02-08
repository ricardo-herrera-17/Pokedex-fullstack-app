import { PokemonTrainerRequestModel } from "../../models/pokemon-trainer";
import { PokemonTrainerRepository } from "../../interfaces/repositories/pokemon-trainer-repository";
import { GetTrainerUseCase } from "../../interfaces/use-cases/get-trainer-use-case";

export class GetTrainer implements GetTrainerUseCase {
  pokemonTrainerRepository: PokemonTrainerRepository;
  constructor(pokemonTrainerRepository: PokemonTrainerRepository) {
    this.pokemonTrainerRepository = pokemonTrainerRepository;
  }

  async execute(
    pokemonTrainer: PokemonTrainerRequestModel
  ): Promise<PokemonTrainerRequestModel | null> {
    return this.pokemonTrainerRepository.getTrainer(pokemonTrainer);
  }
}
