import { PokemonModel } from "../../models/pokemon";

export interface SearchPokemonUseCase {
  execute: (pokemonName: string) => Promise<PokemonModel | null>;
}
