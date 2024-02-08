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
function SearchPokemonController(req, res, searchPokemonUseCase) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const pokemonParam = req.params.pokemon_name;
            const pokemon = yield searchPokemonUseCase.execute(pokemonParam);
            if (!pokemon) {
                res.status(404).send({ message: "Pokemon not found" });
                return;
            }
            const response = { response: [pokemon] };
            res.status(201).send(response);
        }
        catch (error) {
            res.status(500).send({ message: "Error fetching pokemon" });
        }
    });
}
exports.default = SearchPokemonController;
