import request from "supertest";
import { GetPokemonsUseCase } from "../../src/domain/interfaces/use-cases/get-pokemons-use-case";
import { SavePokemonsUseCase } from "../../src/domain/interfaces/use-cases/save-pokemons-use-case";
import { SearchPokemonUseCase } from "../../src/domain/interfaces/use-cases/search-pokemon-use-case";
import { PokemonModel } from "../../src/domain/models/pokemon";
import PokemonRouter from "../../src/presentation/routers/pokemon-router";
import server from "../../src/server";

class MockGetPokemonsUseCase implements GetPokemonsUseCase {
  execute(
    pokemonLimit: number,
    pokemonOffset: number
  ): Promise<PokemonModel[]> {
    throw new Error("Method not implemented.");
  }
}

describe("Pokemon Router", () => {
  let mockGetPokemonsUseCase: GetPokemonsUseCase;
  let savePokemonsUseCase: SavePokemonsUseCase;
  let searchPokemonUseCase: SearchPokemonUseCase;

  beforeAll(() => {
    jest.clearAllMocks();
    mockGetPokemonsUseCase = new MockGetPokemonsUseCase();
    server.use(
      "/",
      PokemonRouter(
        mockGetPokemonsUseCase,
        savePokemonsUseCase,
        searchPokemonUseCase
      )
    );
  });

  describe("GET /", () => {
    test("should return 200 with data", async () => {
      const ExpectedData = {
        response: [
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
        ],
      };
      jest
        .spyOn(mockGetPokemonsUseCase, "execute")
        .mockImplementation(() => Promise.resolve([ExpectedData.response[0]]));

      const response = await request(server).get(
        "/?pokemonLimit=1&pokemonOffset=0"
      );

      expect(response.status).toBe(200);
      expect(mockGetPokemonsUseCase.execute).toHaveBeenCalled();
      expect(response.body).toStrictEqual(ExpectedData);
    });

    test("GET / returns 500 on use case error", async () => {
      jest
        .spyOn(mockGetPokemonsUseCase, "execute")
        .mockImplementation(() => Promise.reject(Error()));
      const response = await request(server).get("/");

      expect(response.status).toBe(500);
      expect(response.body).toStrictEqual({ message: "Error fetching data" });
    });
  });
});
