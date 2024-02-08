import { PokemonTrainerDataSource } from "../../interfaces/pokemon-trainer-data-source";
import { PokemonTrainerRequestModel } from "../../../domain/models/pokemon-trainer";
import bcrypt from "bcrypt";
import { PokemonTrainerSchemaModel } from "../models/mongoose-pokemon-trainer";

export class MongoosePokemonTrainerDataSource
  implements PokemonTrainerDataSource
{
  async findOneTrainer(
    pokemonTrainer: PokemonTrainerRequestModel
  ): Promise<PokemonTrainerRequestModel | null> {
    try {
      const pokemonTrainerDB = await PokemonTrainerSchemaModel.findOne({
        email: pokemonTrainer.email,
      });

      if (!pokemonTrainerDB) return null;

      const isPasswordMatch = await bcrypt.compare(
        pokemonTrainer.password,
        pokemonTrainerDB.password
      );

      if (!isPasswordMatch) return null;

      return pokemonTrainerDB;
    } catch (error) {
      console.error("Error fetching trainer => findOneTrainer", error);
      return null;
    }
  }

  async saveNewTrainer(
    pokemonTrainer: PokemonTrainerRequestModel
  ): Promise<PokemonTrainerRequestModel | null> {
    try {
      const pokemonTrainerDB = await PokemonTrainerSchemaModel.findOne({
        email: pokemonTrainer.email,
      });

      if (pokemonTrainerDB) return null;

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(pokemonTrainer.password, salt);
      const newPokemonTrainer = new PokemonTrainerSchemaModel({
        email: pokemonTrainer.email,
        password: hashedPassword,
        favorite_pokemons: pokemonTrainer.favorite_pokemons,
      });

      await newPokemonTrainer.save();

      return newPokemonTrainer;
    } catch (error) {
      console.error("Error saving trainer => saveNewTrainer ", error);
      return null;
    }
  }

  async saveTrainerPokemons(trainerEmail: string, pokemons: number[]) {
    try {
      const pokemonTrainerDB = await PokemonTrainerSchemaModel.findOne({
        email: trainerEmail,
      });

      if (!pokemonTrainerDB) return false;

      pokemonTrainerDB.favorite_pokemons = pokemons;
      await pokemonTrainerDB.save();

      return true;
    } catch (error) {
      console.error("Error saving pokemons => saveTrainerPokemons ", error);
      return false;
    }
  }
}
