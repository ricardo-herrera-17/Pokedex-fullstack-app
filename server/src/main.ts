import dotenv from "dotenv";
dotenv.config();
import server from "./server";
import cors from "cors";
import passport from "passport";

import PokemonRouter from "./presentation/routers/pokemon-router";
import PokemonTrainerRouter from "./presentation/routers/pokemon-trainer-router";
import { GetPokemons } from "./domain/use-cases/pokemon/get-pokemons";
import { SavePokemon } from "./domain/use-cases/pokemon/save-pokemons";
import { SearchPokemon } from "./domain/use-cases/pokemon/search-pokemon";
import { GetTrainerPokemons } from "./domain/use-cases/pokemon/get-trainer-pokemons";
import { GetTrainer } from "./domain/use-cases/pokemon-trainer/get-trainer";
import { SetTrainer } from "./domain/use-cases/pokemon-trainer/set-trainer";
import { PokemonTrainerRepositoryImpl } from "./domain/repositories/pokemon-trainer-repositoy";
import { PokemonRepositoryImpl } from "./domain/repositories/pokemon-repository";
import { PokeAPIPokemonDataSource } from "./data/data-sources/pokeapi/pokeapi-pokemon-data-source";
import { MongoosePokemonTrainerDataSource } from "./data/data-sources/mongoose/mongoose-pokemon-trainer-data-source";
import { MongoosePokemonDataSource } from "./data/data-sources/mongoose/mongoose-pokemon-data-source";

const port = process.env.PORT || 3000;

(async () => {
  const pokemonRoutes = PokemonRouter(
    new GetPokemons(
      new PokemonRepositoryImpl(
        new PokeAPIPokemonDataSource(),
        new MongoosePokemonDataSource()
      )
    ),
    new SavePokemon(
      new PokemonRepositoryImpl(
        new PokeAPIPokemonDataSource(),
        new MongoosePokemonDataSource()
      )
    ),
    new SearchPokemon(
      new PokemonRepositoryImpl(
        new PokeAPIPokemonDataSource(),
        new MongoosePokemonDataSource()
      )
    )
  );

  const pokemonTrainerRoutes = PokemonTrainerRouter(
    new GetTrainer(
      new PokemonTrainerRepositoryImpl(new MongoosePokemonTrainerDataSource())
    ),
    new SetTrainer(
      new PokemonTrainerRepositoryImpl(new MongoosePokemonTrainerDataSource())
    ),
    new GetTrainerPokemons(
      new PokemonRepositoryImpl(
        new PokeAPIPokemonDataSource(),
        new MongoosePokemonDataSource()
      )
    )
  );

  server.use(cors());
  server.use(passport.initialize());

  server.use(pokemonRoutes);
  server.use(pokemonTrainerRoutes);

  server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
})();
