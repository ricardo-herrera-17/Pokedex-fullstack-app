import {
  PokemonAPIDataSource,
  PokemonDataSource,
} from "../../../src/data/interfaces/pokemon-data-source";
import {
  PokemonUrlModel,
  PokemonModel,
} from "../../../src/domain/models/pokemon";
import { PokemonRepositoryImpl } from "../../../src/domain/repositories/pokemon-repository";

class MockPokemonDataSource implements PokemonAPIDataSource {
  getPokemonsURLs(
    pokemonLimit: number,
    pokemonOffset: number
  ): Promise<PokemonUrlModel[]> {
    throw new Error("Method not implemented.");
  }
  getPokemonsFromURLs(pokemonURLs: PokemonUrlModel[]): Promise<PokemonModel[]> {
    throw new Error("Method not implemented.");
  }
  searchPokemon(pokemonName: string): Promise<PokemonModel | null> {
    throw new Error("Method not implemented.");
  }
}

describe("Pokemon repository", () => {
  let mockPokemonDataSource: PokemonAPIDataSource;
  let pokemonDataSource: PokemonDataSource;

  beforeEach(() => {
    jest.clearAllMocks();
    mockPokemonDataSource = new MockPokemonDataSource();
  });

  describe("getPokemons", () => {
    test("Should return PokemonsModel", async () => {
      const ExpectedPokemonURLModel = [
        { url: "https://pokeapi.co/api/v2/pokemon/1/", id: 1 },
      ];
      const ExpectedPokemonData = [
        {
          id: 1,
          name: "bulbasaur",
          abilities: ["overgrow", "chlorophyll"],
          height: 7,
          weight: 69,
          front_sprite:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
          back_sprite:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png",
          types: ["grass", "poison"],
          stats: {
            hp: 45,
            attack: 49,
            defense: 49,
            special_attack: 65,
            special_defense: 65,
            speed: 45,
          },
        },
      ];

      jest
        .spyOn(mockPokemonDataSource, "getPokemonsURLs")
        .mockImplementation(() => Promise.resolve(ExpectedPokemonURLModel));

      jest
        .spyOn(mockPokemonDataSource, "getPokemonsFromURLs")
        .mockImplementation(() => Promise.resolve(ExpectedPokemonData));

      const pokemonRepositoryImpl = new PokemonRepositoryImpl(
        mockPokemonDataSource,
        pokemonDataSource
      );
      const result = await pokemonRepositoryImpl.getPokemons(1, 0);

      expect(result).toStrictEqual(ExpectedPokemonData);
    });
  });
});
