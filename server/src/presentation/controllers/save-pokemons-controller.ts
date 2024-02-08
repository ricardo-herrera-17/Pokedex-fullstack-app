import { Request, Response } from "express";
import { SavePokemonsUseCase } from "../../domain/interfaces/use-cases/save-pokemons-use-case";
import fromReqToTrainer from "../utils/fromReqToTrainer";

export default async function SavePokemonsController(
  req: Request,
  res: Response,
  savePokemonUseCase: SavePokemonsUseCase
) {
  try {
    const trainerEmail = fromReqToTrainer(req);
    if (!trainerEmail)
      return res
        .status(401)
        .json({ success: false, message: "Authorization token invalid" });

    let trainerPokemons: number[] = req.body.favorite_pokemons;
    trainerPokemons = Array.from(new Set(trainerPokemons)).sort();

    const isSaved = await savePokemonUseCase.execute(
      trainerEmail,
      trainerPokemons
    );

    if (!isSaved)
      return res.status(404).send({ message: "Error saving pokemons" });

    res.status(201).json({ message: "Pokemons saved" });
  } catch (error) {
    res.status(500).send({ message: "Error saving pokemons" });
  }
}
