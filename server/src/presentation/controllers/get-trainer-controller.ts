import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { GetTrainerUseCase } from "../../domain/interfaces/use-cases/get-trainer-use-case";
import {
  PokemonTrainerRequestModel,
  PokemonTrainerResponseModel,
} from "../../domain/models/pokemon-trainer";

export default async function GetTrainerController(
  req: Request,
  res: Response,
  getTrainerUseCase: GetTrainerUseCase
) {
  try {
    if (!req.body.email || !req.body.password) {
      res.status(401).send({ message: "Email and password are required" });
      return;
    }

    const unknwonTrainer: PokemonTrainerRequestModel = {
      email: req.body.email,
      password: req.body.password,
      favorite_pokemons: req.body.favorite_pokemons || [],
    };

    let trainer = await getTrainerUseCase.execute(unknwonTrainer);
    if (!trainer) {
      res.status(404).send({ message: "Trainer not found" });
      return;
    }

    const pokemonTrainer: PokemonTrainerResponseModel = {
      email: trainer.email,
      favorite_pokemons: trainer.favorite_pokemons,
      jwt: createToken(trainer),
    };

    res.status(200).json(pokemonTrainer);
  } catch (error) {
    res.status(500).send({ message: "Error fetching data" });
  }
}

function createToken(trainer: PokemonTrainerRequestModel): string {
  const jwtSecret = process.env.JWT_SECRET || "jwt-secret";
  return jwt.sign({ email: trainer.email }, jwtSecret, {
    expiresIn: 86400,
  });
}
