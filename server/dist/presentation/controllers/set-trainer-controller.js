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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function SetTrainerController(req, res, setTrainerUseCase) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!req.body.email || !req.body.password) {
                res.status(401).send({ message: "Email and password are required" });
                return;
            }
            const unknwonTrainer = {
                email: req.body.email,
                password: req.body.password,
                favorite_pokemons: req.body.favorite_pokemons || [],
            };
            const trainer = yield setTrainerUseCase.execute(unknwonTrainer);
            if (!trainer) {
                res.status(404).send({ message: "Trainer already exists" });
                return;
            }
            const pokemonTrainer = {
                email: trainer.email,
                favorite_pokemons: trainer.favorite_pokemons,
                jwt: createToken(trainer),
            };
            res.status(201).json(pokemonTrainer);
        }
        catch (error) {
            res.status(500).send({ message: "Error fetching data" });
        }
    });
}
exports.default = SetTrainerController;
function createToken(trainer) {
    const jwtSecret = process.env.JWT_SECRET || "jwt-secret";
    return jsonwebtoken_1.default.sign({ email: trainer.email }, jwtSecret, {
        expiresIn: 86400,
    });
}
