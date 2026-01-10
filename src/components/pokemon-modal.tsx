import type React from "react";
import type { PokemonDetail } from "@/types/pokemon";

const PokemonModal: React.FC<{
  pokemon: PokemonDetail;
  onClose: () => void;
}> = ({ pokemon, onClose }) => {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg p-6 max-w-md w-full text-gray-800"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold capitalize">{pokemon.name}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ✕
          </button>
        </div>

        <img
          src={
            pokemon.sprites.other?.["official-artwork"]?.front_default ||
            pokemon.sprites.front_default
          }
          alt={pokemon.name}
          className="w-full mb-4"
        />

        <div className="space-y-2 text-sm">
          <p>
            <strong>ID:</strong> #{pokemon.id}
          </p>
          <p>
            <strong>Height:</strong> {pokemon.height / 10} m
          </p>
          <p>
            <strong>Weight:</strong> {pokemon.weight / 10} kg
          </p>
          <p>
            <strong>Types:</strong>{" "}
            {pokemon.types.map((t) => t.type.name).join(", ")}
          </p>
          <p>
            <strong>Abilities:</strong>{" "}
            {pokemon.abilities.map((a) => a.ability.name).join(", ")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PokemonModal;