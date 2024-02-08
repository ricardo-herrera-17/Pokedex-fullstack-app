import { PokeAPIPokemonDataSource } from "../../../../src/data/data-sources/pokeapi/pokeapi-pokemon-data-source";

describe("PokeAPI pokemon data source", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getPokemonsURLs", () => {
    test("Should return PokemonsURLModel", async () => {
      const ExpectedPokemonURLModel = [
        { url: "https://pokeapi.co/api/v2/pokemon/1/", id: 1 },
      ];

      const pokeAPIPokemonDataSource = new PokeAPIPokemonDataSource();
      const result = await pokeAPIPokemonDataSource.getPokemonsURLs(1, 0);

      expect(result).toStrictEqual(ExpectedPokemonURLModel);
    });
  });

  describe("getPokemonsFromURLs", () => {
    test("Should return PokemonsModel", async () => {
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

      const pokeAPIPokemonDataSource = new PokeAPIPokemonDataSource();
      const result = await pokeAPIPokemonDataSource.getPokemonsFromURLs([
        { url: "https://pokeapi.co/api/v2/pokemon/1/", id: 1 },
      ]);

      expect(result).toStrictEqual(ExpectedPokemonData);
    });
  });

  describe("searchPokemon", () => {
    test("Should return PokemonsModel", async () => {
      const ExpectedPokemonData = {
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
      };

      const pokeAPIPokemonDataSource = new PokeAPIPokemonDataSource();
      const result = await pokeAPIPokemonDataSource.searchPokemon("bulbasaur");

      expect(result).toStrictEqual(ExpectedPokemonData);
    });
  });
});
