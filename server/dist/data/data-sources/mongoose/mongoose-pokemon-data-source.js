"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoosePokemonDataSource = void 0;
const mongoose_pokemon_trainer_1 = require("../models/mongoose-pokemon-trainer");
class MongoosePokemonDataSource {
    saveTrainerPokemons(trainerEmail, pokemons) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const pokemonTrainerDB = yield mongoose_pokemon_trainer_1.PokemonTrainerSchemaModel.findOne({
                    email: trainerEmail,
                });
                if (!pokemonTrainerDB)
                    return false;
                const favoritePokemons = Array.from(new Set(pokemonTrainerDB.favorite_pokemons.concat(pokemons))).sort();
                pokemonTrainerDB.favorite_pokemons = favoritePokemons;
                yield pokemonTrainerDB.save();
                return true;
            }
            catch (error) {
                console.error("Error saving pokemons => saveTrainerPokemons ", error);
                return false;
            }
        });
    }
    getTrainerPokemons(trainerEmail) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const pokemonTrainerDB = yield mongoose_pokemon_trainer_1.PokemonTrainerSchemaModel.findOne({
                    email: trainerEmail,
                });
                if (!pokemonTrainerDB)
                    return [];
                return pokemonTrainerDB.favorite_pokemons;
            }
            catch (error) {
                console.error("Error getting pokemons => getTrainerPokemons ", error);
                return [];
            }
        });
    }
}
exports.MongoosePokemonDataSource = MongoosePokemonDataSource;
