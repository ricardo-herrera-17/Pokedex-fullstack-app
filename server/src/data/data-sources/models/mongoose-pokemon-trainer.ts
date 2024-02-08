import { model, Schema } from "mongoose";
import { PokemonTrainerRequestModel } from "../../../domain/models/pokemon-trainer";

const pokemonTrainerSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  favorite_pokemons: {
    type: [Number],
    default: [],
  },
});

const PokemonTrainerSchemaModel = model<PokemonTrainerRequestModel>(
  "Trainer",
  pokemonTrainerSchema
);

export { PokemonTrainerSchemaModel };
