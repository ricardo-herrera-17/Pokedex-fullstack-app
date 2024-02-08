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
const fromReqToTrainer_1 = __importDefault(require("../utils/fromReqToTrainer"));
function SavePokemonsController(req, res, savePokemonUseCase) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const trainerEmail = (0, fromReqToTrainer_1.default)(req);
            if (!trainerEmail)
                return res
                    .status(401)
                    .json({ success: false, message: "Authorization token invalid" });
            let trainerPokemons = req.body.favorite_pokemons;
            trainerPokemons = Array.from(new Set(trainerPokemons)).sort();
            const isSaved = yield savePokemonUseCase.execute(trainerEmail, trainerPokemons);
            if (!isSaved)
                return res.status(404).send({ message: "Error saving pokemons" });
            res.status(201).json({ message: "Pokemons saved" });
        }
        catch (error) {
            res.status(500).send({ message: "Error saving pokemons" });
        }
    });
}
exports.default = SavePokemonsController;
