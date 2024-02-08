import { PokemonDataSource } from "../../interfaces/pokemon-data-source";
import { PokemonTrainerSchemaModel } from "../models/mongoose-pokemon-trainer";

export class MongoosePokemonDataSource implements PokemonDataSource {
  async saveTrainerPokemons(trainerEmail: string, pokemons: number[]) {
    try {
      const pokemonTrainerDB = await PokemonTrainerSchemaModel.findOne({
        email: trainerEmail,
      });

      if (!pokemonTrainerDB) return false;

      const favoritePokemons = Array.from(
        new Set(pokemonTrainerDB.favorite_pokemons.concat(pokemons))
      ).sort();
      pokemonTrainerDB.favorite_pokemons = favoritePokemons;
      await pokemonTrainerDB.save();

      return true;
    } catch (error) {
      console.error("Error saving pokemons => saveTrainerPokemons ", error);
      return false;
    }
  }
  async getTrainerPokemons(trainerEmail: string): Promise<number[]> {
    try {
      const pokemonTrainerDB = await PokemonTrainerSchemaModel.findOne({
        email: trainerEmail,
      });

      if (!pokemonTrainerDB) return [];

      return pokemonTrainerDB.favorite_pokemons;
    } catch (error) {
      console.error("Error getting pokemons => getTrainerPokemons ", error);
      return [];
    }
  }
}
