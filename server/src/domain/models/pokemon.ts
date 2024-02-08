export interface PokemonModel {
  id: number | null;
  name: string;
  abilities: string[];
  height: number;
  weight: number;
  front_sprite: string;
  back_sprite: string;
  types: string[];
  stats: PokemonStatsModel;
}

export interface PokemonStatsModel {
  hp: number;
  attack: number;
  defense: number;
  special_attack: number;
  special_defense: number;
  speed: number;
}

export interface PokemonUrlModel {
  id: number | null;
  url: string;
}

export type PokemonForTrainerModel = PokemonModel[] | null;
