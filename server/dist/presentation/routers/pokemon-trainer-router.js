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
const get_trainer_controller_1 = __importDefault(require("../controllers/get-trainer-controller"));
const set_trainer_controller_1 = __importDefault(require("../controllers/set-trainer-controller"));
const get_trainer_pokemons_controller_1 = __importDefault(require("../controllers/get-trainer-pokemons-controller"));
function PokemonTrainerRouter(getTrainerUseCase, setTrainerUseCase, getTrainerPokemonsUseCase) {
    const router = express_1.default.Router();
    router.post("/login", (req, res) => __awaiter(this, void 0, void 0, function* () {
        yield (0, get_trainer_controller_1.default)(req, res, getTrainerUseCase);
    }));
    router.post("/sign-up", (req, res) => __awaiter(this, void 0, void 0, function* () {
        yield (0, set_trainer_controller_1.default)(req, res, setTrainerUseCase);
    }));
    router.post("/my-pokemons", (req, res) => __awaiter(this, void 0, void 0, function* () {
        yield (0, get_trainer_pokemons_controller_1.default)(req, res, getTrainerPokemonsUseCase);
    }));
    return router;
}
exports.default = PokemonTrainerRouter;
