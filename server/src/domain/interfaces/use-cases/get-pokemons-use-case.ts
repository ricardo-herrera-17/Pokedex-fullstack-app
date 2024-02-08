import { PokemonModel } from "../../models/pokemon";

export interface GetPokemonsUseCase {
  execute: (
    pokemonLimit: number,
    pokemonOffset: number
  ) => Promise<PokemonModel[]>;
}
