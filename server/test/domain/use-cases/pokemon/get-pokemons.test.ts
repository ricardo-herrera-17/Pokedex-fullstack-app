import { PokemonRepository } from "../../../../src/domain/interfaces/repositories/pokemon-repository";
import {
  PokemonForTrainerModel,
  PokemonModel,
} from "../../../../src/domain/models/pokemon";
import { GetPokemons } from "../../../../src/domain/use-cases/pokemon/get-pokemons";

class MockPokemonRepository implements PokemonRepository {
  getPokemons(pokemonLimit: number, pokemonOffset: number): Promise<any> {
    throw new Error("Method not implemented.");
  }
  savePokemons(email: string, pokemons: number[]): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  searchPokemon(pokemonName: string): Promise<PokemonModel | null> {
    throw new Error("Method not implemented.");
  }
  getTrainerPokemons(pokemonTrainer: string): Promise<PokemonForTrainerModel> {
    throw new Error("Method not implemented.");
  }
}

describe("Get pokemons use case", () => {
  let mockPokemonRepository: PokemonRepository;

  beforeEach(() => {
    jest.clearAllMocks();
    mockPokemonRepository = new MockPokemonRepository();
  });

  test("Should return PokemonsModel", async () => {
    const ExpectedData = [
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
      .spyOn(mockPokemonRepository, "getPokemons")
      .mockImplementation(() => Promise.resolve(ExpectedData));

    const getPokemonsUseCase = new GetPokemons(mockPokemonRepository);
    const result = await getPokemonsUseCase.execute(1, 0);

    expect(result).toStrictEqual(ExpectedData);
  });
});
