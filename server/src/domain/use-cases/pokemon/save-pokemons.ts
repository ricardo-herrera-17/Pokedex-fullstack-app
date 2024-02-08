import { SavePokemonsUseCase } from "../../interfaces/use-cases/save-pokemons-use-case";
import { PokemonRepository } from "../../interfaces/repositories/pokemon-repository";

export class SavePokemon implements SavePokemonsUseCase {
  pokemonRepository: PokemonRepository;
  constructor(pokemonRepository: PokemonRepository) {
    this.pokemonRepository = pokemonRepository;
  }

  async execute(email: string, pokemons: number[]): Promise<boolean> {
    return this.pokemonRepository.savePokemons(email, pokemons);
  }
}
