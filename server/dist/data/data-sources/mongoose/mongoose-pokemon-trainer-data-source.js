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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoosePokemonTrainerDataSource = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const mongoose_pokemon_trainer_1 = require("../models/mongoose-pokemon-trainer");
class MongoosePokemonTrainerDataSource {
    findOneTrainer(pokemonTrainer) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const pokemonTrainerDB = yield mongoose_pokemon_trainer_1.PokemonTrainerSchemaModel.findOne({
                    email: pokemonTrainer.email,
                });
                if (!pokemonTrainerDB)
                    return null;
                const isPasswordMatch = yield bcrypt_1.default.compare(pokemonTrainer.password, pokemonTrainerDB.password);
                if (!isPasswordMatch)
                    return null;
                return pokemonTrainerDB;
            }
            catch (error) {
                console.error("Error fetching trainer => findOneTrainer", error);
                return null;
            }
        });
    }
    saveNewTrainer(pokemonTrainer) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const pokemonTrainerDB = yield mongoose_pokemon_trainer_1.PokemonTrainerSchemaModel.findOne({
                    email: pokemonTrainer.email,
                });
                if (pokemonTrainerDB)
                    return null;
                const salt = yield bcrypt_1.default.genSalt(10);
                const hashedPassword = yield bcrypt_1.default.hash(pokemonTrainer.password, salt);
                const newPokemonTrainer = new mongoose_pokemon_trainer_1.PokemonTrainerSchemaModel({
                    email: pokemonTrainer.email,
                    password: hashedPassword,
                    favorite_pokemons: pokemonTrainer.favorite_pokemons,
                });
                yield newPokemonTrainer.save();
                return newPokemonTrainer;
            }
            catch (error) {
                console.error("Error saving trainer => saveNewTrainer ", error);
                return null;
            }
        });
    }
    saveTrainerPokemons(trainerEmail, pokemons) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const pokemonTrainerDB = yield mongoose_pokemon_trainer_1.PokemonTrainerSchemaModel.findOne({
                    email: trainerEmail,
                });
                if (!pokemonTrainerDB)
                    return false;
                pokemonTrainerDB.favorite_pokemons = pokemons;
                yield pokemonTrainerDB.save();
                return true;
            }
            catch (error) {
                console.error("Error saving pokemons => saveTrainerPokemons ", error);
                return false;
            }
        });
    }
}
exports.MongoosePokemonTrainerDataSource = MongoosePokemonTrainerDataSource;
