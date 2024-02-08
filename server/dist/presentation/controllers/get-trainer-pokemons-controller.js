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
function GetTrainerPokemonsController(req, res, getTrainerPokemonsUseCase) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const trainerEmail = (0, fromReqToTrainer_1.default)(req);
            if (!trainerEmail)
                return res
                    .status(401)
                    .json({ success: false, message: "Authorization token invalid" });
            const pokemons = yield getTrainerPokemonsUseCase.execute(trainerEmail);
            if (!pokemons)
                return res.status(404).send({ message: "Error fetching pokemons" });
            pokemons.sort((a, b) => a.id - b.id);
            const response = { response: pokemons };
            res.status(200).json(response);
        }
        catch (error) {
            res.status(500).send({ message: "Error fetching data" });
        }
    });
}
exports.default = GetTrainerPokemonsController;
