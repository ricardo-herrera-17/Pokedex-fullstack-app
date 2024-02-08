import { Request, Response } from "express";
import { GetTrainerPokemonsUseCase } from "../../domain/interfaces/use-cases/get-trainer-pokemons-use-case";
import fromReqToTrainer from "../utils/fromReqToTrainer";

export default async function GetTrainerPokemonsController(
  req: Request,
  res: Response,
  getTrainerPokemonsUseCase: GetTrainerPokemonsUseCase
) {
  try {
    const trainerEmail = fromReqToTrainer(req);
    if (!trainerEmail)
      return res
        .status(401)
        .json({ success: false, message: "Authorization token invalid" });

    const pokemons = await getTrainerPokemonsUseCase.execute(trainerEmail);
    if (!pokemons)
      return res.status(404).send({ message: "Error fetching pokemons" });

    pokemons.sort((a, b) => (a?.id ?? 0) - (b?.id ?? 0));
    const response = { response: pokemons };
    res.status(200).json(response);
  } catch (error) {
    res.status(500).send({ message: "Error fetching data" });
  }
}
