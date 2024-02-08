import "./PokemonCard.css";
import { memo, useState } from "react";
import { PokemonModel } from "../../types/pokemon";
import { searchIcon } from "../../utils/icons";
import Star from "../../assets/icons/star.svg";
import FullStar from "../../assets/icons/full_star.svg";

interface props {
  pokemon: PokemonModel;
  addFavorite: (id: number) => void;
}

const PokemonCard = ({ pokemon, addFavorite }: props) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  if (!pokemon) return null;

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const pokemonId = "#" + pokemon.id.toString().padStart(3, "000");
  const pokemonTypeIcon = searchIcon(pokemon.types[0]);
  const onClickFavorite = (e: any) => {
    e.preventDefault();
    setIsFavorite(true);
    addFavorite(pokemon.id);
  };

  return (
    <div className="card-container">
      <div
        className={`card type-${pokemon.types[0]}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="pokemon-id-type">
          {pokemonTypeIcon && (
            <img src={pokemonTypeIcon} alt={pokemon.types[0]} />
          )}
          <span>{pokemonId}</span>
        </div>
        {isFavorite ? (
          <img
            className="star-favorite"
            src={FullStar}
            alt="star"
            onClick={onClickFavorite as any}
          />
        ) : (
          <img
            className="star-favorite"
            src={Star}
            alt="star"
            onClick={onClickFavorite as any}
          />
        )}
        <img
          className="star-favorite"
          src={Star}
          alt="star"
          onClick={onClickFavorite as any}
        />

        <div className="card-title">
          <h2>{pokemon.name.replace(/-/g, " ")}</h2>
          <div className="pokemon-types">
            {pokemon.types.map((type) => (
              <span className="type" key={type}>
                {type}
              </span>
            ))}
          </div>
        </div>
        <div className="pk-image">
          {!isHovered && <img alt={pokemon.name} src={pokemon.back_sprite} />}
          {isHovered && <img alt={pokemon.name} src={pokemon.front_sprite} />}
        </div>
      </div>
    </div>
  );
};

export default memo(PokemonCard);
