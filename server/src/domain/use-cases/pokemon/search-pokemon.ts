import { PokemonModel } from "../../models/pokemon";
import { PokemonRepository } from "../../interfaces/repositories/pokemon-repository";
import { SearchPokemonUseCase } from "../../interfaces/use-cases/search-pokemon-use-case";

export class SearchPokemon implements SearchPokemonUseCase {
  pokemonRepository: PokemonRepository;
  constructor(pokemonRepository: PokemonRepository) {
    this.pokemonRepository = pokemonRepository;
  }

  async execute(pokemonName: string): Promise<PokemonModel | null> {
    return this.pokemonRepository.searchPokemon(pokemonName);
  }
}
