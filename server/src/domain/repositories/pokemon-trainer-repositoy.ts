import { PokemonTrainerRequestModel } from "../models/pokemon-trainer";
import { PokemonTrainerDataSource } from "../../data/interfaces/pokemon-trainer-data-source";
import { PokemonTrainerRepository } from "../interfaces/repositories/pokemon-trainer-repository";

export class PokemonTrainerRepositoryImpl implements PokemonTrainerRepository {
  pokemonTrainerDataSource: PokemonTrainerDataSource;
  constructor(pokemonTrainerDataSource: PokemonTrainerDataSource) {
    this.pokemonTrainerDataSource = pokemonTrainerDataSource;
  }

  async getTrainer(
    pokemonTrainer: PokemonTrainerRequestModel
  ): Promise<PokemonTrainerRequestModel | null> {
    return await this.pokemonTrainerDataSource.findOneTrainer(pokemonTrainer);
  }

  async setTrainer(
    pokemonTrainer: PokemonTrainerRequestModel
  ): Promise<PokemonTrainerRequestModel | null> {
    return await this.pokemonTrainerDataSource.saveNewTrainer(pokemonTrainer);
  }
}
