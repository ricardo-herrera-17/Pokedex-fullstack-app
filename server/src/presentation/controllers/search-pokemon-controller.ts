import { Request, Response } from "express";
import { SearchPokemonUseCase } from "../../domain/interfaces/use-cases/search-pokemon-use-case";
import { PokemonModel } from "../../domain/models/pokemon";

export default async function SearchPokemonController(
  req: Request,
  res: Response,
  searchPokemonUseCase: SearchPokemonUseCase
) {
  try {
    const pokemonParam = req.params.pokemon_name;
    const pokemon: PokemonModel | null = await searchPokemonUseCase.execute(
      pokemonParam
    );

    if (!pokemon) {
      res.status(404).send({ message: "Pokemon not found" });
      return;
    }

    const response = { response: [pokemon] };
    res.status(201).send(response);
  } catch (error) {
    res.status(500).send({ message: "Error fetching pokemon" });
  }
}
