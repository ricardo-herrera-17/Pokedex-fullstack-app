import "./PokemonGrid.css";
import { useNavigate } from "react-router-dom";
import PokemonCard from "../PokemonCard";
import { PokemonModel } from "../../types/pokemon";
import { saveFavoritePokemons } from "../../services/api";
import { useAuth } from "../../provider/authProvider";

interface props {
  pokemons: PokemonModel[];
}

const PokemonGrid = ({ pokemons }: props) => {
  const { signed } = useAuth();
  const navigate = useNavigate();
  let addFavoritePokemon: any;

  if (signed) {
    addFavoritePokemon = async (pokemonId: number) => {
      await saveFavoritePokemons([pokemonId]);
    };
  } else {
    addFavoritePokemon = () => {
      navigate("/login");
    };
  }

  return (
    <div className="pokedex-view">
      {pokemons.map((pokemon) => {
        return (
          <PokemonCard
            pokemon={pokemon}
            key={pokemon.id}
            addFavorite={addFavoritePokemon}
          />
        );
      })}
    </div>
  );
};

export default PokemonGrid;
