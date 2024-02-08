import { PokemonModel } from "../../models/pokemon";
import { PokemonRepository } from "../../interfaces/repositories/pokemon-repository";
import { GetPokemonsUseCase } from "../../interfaces/use-cases/get-pokemons-use-case";

export class GetPokemons implements GetPokemonsUseCase {
  pokemonRepository: PokemonRepository;
  constructor(pokemonRepository: PokemonRepository) {
    this.pokemonRepository = pokemonRepository;
  }

  async execute(
    pokemonLimit: number,
    pokemonOffset: number
  ): Promise<PokemonModel[]> {
    return this.pokemonRepository.getPokemons(pokemonLimit, pokemonOffset);
  }
}
