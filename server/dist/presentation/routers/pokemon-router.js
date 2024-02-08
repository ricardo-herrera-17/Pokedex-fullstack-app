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
const express_1 = __importDefault(require("express"));
const get_pokemons_controller_1 = __importDefault(require("../controllers/get-pokemons-controller"));
const save_pokemons_controller_1 = __importDefault(require("../controllers/save-pokemons-controller"));
const search_pokemon_controller_1 = __importDefault(require("../controllers/search-pokemon-controller"));
function PokemonRouter(getPokemonsUseCase, savePokemonUseCase, searchPokemonUseCase) {
    const router = express_1.default.Router();
    router.get("/", (req, res) => __awaiter(this, void 0, void 0, function* () {
        yield (0, get_pokemons_controller_1.default)(req, res, getPokemonsUseCase);
    }));
    router.post("/save-pokemons", (req, res) => __awaiter(this, void 0, void 0, function* () {
        yield (0, save_pokemons_controller_1.default)(req, res, savePokemonUseCase);
    }));
    router.get("/search/:pokemon_name", (req, res) => __awaiter(this, void 0, void 0, function* () {
        yield (0, search_pokemon_controller_1.default)(req, res, searchPokemonUseCase);
    }));
    return router;
}
exports.default = PokemonRouter;
