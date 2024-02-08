"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PokemonTrainerSchemaModel = void 0;
const mongoose_1 = require("mongoose");
const pokemonTrainerSchema = new mongoose_1.Schema({
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
const PokemonTrainerSchemaModel = (0, mongoose_1.model)("Trainer", pokemonTrainerSchema);
exports.PokemonTrainerSchemaModel = PokemonTrainerSchemaModel;
