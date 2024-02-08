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
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const server_1 = __importDefault(require("./server"));
const cors_1 = __importDefault(require("cors"));
const passport_1 = __importDefault(require("passport"));
const pokemon_router_1 = __importDefault(require("./presentation/routers/pokemon-router"));
const pokemon_trainer_router_1 = __importDefault(require("./presentation/routers/pokemon-trainer-router"));
const get_pokemons_1 = require("./domain/use-cases/pokemon/get-pokemons");
const save_pokemons_1 = require("./domain/use-cases/pokemon/save-pokemons");
const search_pokemon_1 = require("./domain/use-cases/pokemon/search-pokemon");
const get_trainer_pokemons_1 = require("./domain/use-cases/pokemon/get-trainer-pokemons");
const get_trainer_1 = require("./domain/use-cases/pokemon-trainer/get-trainer");
const set_trainer_1 = require("./domain/use-cases/pokemon-trainer/set-trainer");
const pokemon_trainer_repositoy_1 = require("./domain/repositories/pokemon-trainer-repositoy");
const pokemon_repository_1 = require("./domain/repositories/pokemon-repository");
const pokeapi_pokemon_data_source_1 = require("./data/data-sources/pokeapi/pokeapi-pokemon-data-source");
const mongoose_pokemon_trainer_data_source_1 = require("./data/data-sources/mongoose/mongoose-pokemon-trainer-data-source");
const mongoose_pokemon_data_source_1 = require("./data/data-sources/mongoose/mongoose-pokemon-data-source");
const port = process.env.PORT || 3000;
(() => __awaiter(void 0, void 0, void 0, function* () {
    const pokemonRoutes = (0, pokemon_router_1.default)(new get_pokemons_1.GetPokemons(new pokemon_repository_1.PokemonRepositoryImpl(new pokeapi_pokemon_data_source_1.PokeAPIPokemonDataSource(), new mongoose_pokemon_data_source_1.MongoosePokemonDataSource())), new save_pokemons_1.SavePokemon(new pokemon_repository_1.PokemonRepositoryImpl(new pokeapi_pokemon_data_source_1.PokeAPIPokemonDataSource(), new mongoose_pokemon_data_source_1.MongoosePokemonDataSource())), new search_pokemon_1.SearchPokemon(new pokemon_repository_1.PokemonRepositoryImpl(new pokeapi_pokemon_data_source_1.PokeAPIPokemonDataSource(), new mongoose_pokemon_data_source_1.MongoosePokemonDataSource())));
    const pokemonTrainerRoutes = (0, pokemon_trainer_router_1.default)(new get_trainer_1.GetTrainer(new pokemon_trainer_repositoy_1.PokemonTrainerRepositoryImpl(new mongoose_pokemon_trainer_data_source_1.MongoosePokemonTrainerDataSource())), new set_trainer_1.SetTrainer(new pokemon_trainer_repositoy_1.PokemonTrainerRepositoryImpl(new mongoose_pokemon_trainer_data_source_1.MongoosePokemonTrainerDataSource())), new get_trainer_pokemons_1.GetTrainerPokemons(new pokemon_repository_1.PokemonRepositoryImpl(new pokeapi_pokemon_data_source_1.PokeAPIPokemonDataSource(), new mongoose_pokemon_data_source_1.MongoosePokemonDataSource())));
    server_1.default.use((0, cors_1.default)());
    server_1.default.use(passport_1.default.initialize());
    server_1.default.use(pokemonRoutes);
    server_1.default.use(pokemonTrainerRoutes);
    server_1.default.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}))();
