export interface PokemonModel {
  id: number;
  name: string;
  abilities: string[];
  height: number;
  weight: number;
  front_sprite: string;
  back_sprite: string;
  types: string[];
  stats: {
    hp: number;
    attack: number;
    defense: number;
    special_attack: number;
    special_defense: number;
    speed: number;
  };
}
