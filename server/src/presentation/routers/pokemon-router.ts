import express from "express";
import { Request, Response } from "express";
import { GetPokemonsUseCase } from "../../domain/interfaces/use-cases/get-pokemons-use-case";
import { SavePokemonsUseCase } from "../../domain/interfaces/use-cases/save-pokemons-use-case";
import { SearchPokemonUseCase } from "../../domain/interfaces/use-cases/search-pokemon-use-case";
import GetPokemonsController from "../controllers/get-pokemons-controller";
import SavePokemonsController from "../controllers/save-pokemons-controller";
import SearchPokemonController from "../controllers/search-pokemon-controller";

export default function PokemonRouter(
  getPokemonsUseCase: GetPokemonsUseCase,
  savePokemonUseCase: SavePokemonsUseCase,
  searchPokemonUseCase: SearchPokemonUseCase
) {
  const router = express.Router();

  router.get("/", async (req: Request, res: Response) => {
    await GetPokemonsController(req, res, getPokemonsUseCase);
  });

  router.post("/save-pokemons", async (req: Request, res: Response) => {
    await SavePokemonsController(req, res, savePokemonUseCase);
  });

  router.get("/search/:pokemon_name", async (req: Request, res: Response) => {
    await SearchPokemonController(req, res, searchPokemonUseCase);
  });

  return router;
}
