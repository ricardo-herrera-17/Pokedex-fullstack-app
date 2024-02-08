import { PokemonModel } from "../../models/pokemon";
import { PokemonRepository } from "../../interfaces/repositories/pokemon-repository";
import { GetTrainerPokemonsUseCase } from "../../interfaces/use-cases/get-trainer-pokemons-use-case";

export class GetTrainerPokemons implements GetTrainerPokemonsUseCase {
  pokemonRepository: PokemonRepository;
  constructor(pokemonRepository: PokemonRepository) {
    this.pokemonRepository = pokemonRepository;
  }

  async execute(pokemonTrainer: string): Promise<PokemonModel[] | null> {
    return this.pokemonRepository.getTrainerPokemons(pokemonTrainer);
  }
}
