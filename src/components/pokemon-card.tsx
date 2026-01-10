import type { PokemonDetail } from "@/types/pokemon";
import type React from "react";

const PokemonCard: React.FC<{ pokemon: PokemonDetail, onSelect:(p: PokemonDetail)=>void }> = ({ pokemon, onSelect }) => {
  return (
    <div
      key={pokemon.id}
      className="flex flex-col lg:flex-row w-100 lg:w-200 justify-between p-4 border rounded hover:bg-blue-100 cursor-pointer"
      onClick={() => onSelect(pokemon)}
    >
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <p className="content-center font-bold capitalize">
        #{pokemon.id} {pokemon.name}
      </p>
      <div className="justify-center w-30 flex flex-col ">
        {pokemon.types.map((t) => (
          <span
            key={t.type.name}
            className=" mx-2 my-2 px-2 py-1 bg-green-100 rounded text-gray-800 w-max"
          >
            {t.type.name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default PokemonCard;