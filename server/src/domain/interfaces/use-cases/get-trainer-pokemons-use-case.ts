import { PokemonModel } from "../../models/pokemon";

export interface GetTrainerPokemonsUseCase {
  execute: (pokemonTrainer: string) => Promise<PokemonModel[] | null>;
}
