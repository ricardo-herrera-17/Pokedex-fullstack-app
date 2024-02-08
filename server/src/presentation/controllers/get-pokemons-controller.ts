import { Request, Response } from "express";
import { GetPokemonsUseCase } from "../../domain/interfaces/use-cases/get-pokemons-use-case";
import { PokemonModel } from "../../domain/models/pokemon";

export default async function GetPokemonsController(
  req: Request,
  res: Response,
  getPokemonsUseCase: GetPokemonsUseCase
) {
  try {
    let pokemonLimit = parseInt(req.query.pokemonLimit as string);
    let pokemonOffset = parseInt(req.query.pokemonOffset as string);

    pokemonLimit = isNaN(pokemonLimit) || pokemonLimit < 0 ? 100 : pokemonLimit;
    pokemonOffset =
      isNaN(pokemonOffset) || pokemonOffset < 0 ? 0 : pokemonOffset;

    const pokemons: PokemonModel[] = await getPokemonsUseCase.execute(
      pokemonLimit,
      pokemonOffset
    );

    const response = { response: pokemons };
    res.status(200).json(response);
  } catch (error) {
    res.status(500).send({ message: "Error fetching data" });
  }
}
