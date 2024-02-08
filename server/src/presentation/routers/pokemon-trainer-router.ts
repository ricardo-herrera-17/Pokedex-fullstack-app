import express from "express";
import { Request, Response } from "express";
import { GetTrainerUseCase } from "../../domain/interfaces/use-cases/get-trainer-use-case";
import { SetTrainerUseCase } from "../../domain/interfaces/use-cases/set-trainer-use-case";
import { GetTrainerPokemonsUseCase } from "../../domain/interfaces/use-cases/get-trainer-pokemons-use-case";
import GetTrainerController from "../controllers/get-trainer-controller";
import SetTrainerController from "../controllers/set-trainer-controller";
import GetTrainerPokemonsController from "../controllers/get-trainer-pokemons-controller";

export default function PokemonTrainerRouter(
  getTrainerUseCase: GetTrainerUseCase,
  setTrainerUseCase: SetTrainerUseCase,
  getTrainerPokemonsUseCase: GetTrainerPokemonsUseCase
) {
  const router = express.Router();

  router.post("/login", async (req: Request, res: Response) => {
    await GetTrainerController(req, res, getTrainerUseCase);
  });

  router.post("/sign-up", async (req: Request, res: Response) => {
    await SetTrainerController(req, res, setTrainerUseCase);
  });

  router.post("/my-pokemons", async (req: Request, res: Response) => {
    await GetTrainerPokemonsController(req, res, getTrainerPokemonsUseCase);
  });

  return router;
}
