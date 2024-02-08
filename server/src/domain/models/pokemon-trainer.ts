export interface PokemonTrainerRequestModel {
  email: string;
  password: string;
  favorite_pokemons: number[];
}

export interface PokemonTrainerResponseModel {
  email: string;
  jwt: string;
  favorite_pokemons: number[];
}
