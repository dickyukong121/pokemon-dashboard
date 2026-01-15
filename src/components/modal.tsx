import type { PokemonDetail } from "@/types/pokemon";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "flowbite-react";
import { useSelector } from "react-redux";
import { IoMdClose } from "react-icons/io";

const ModalExample: React.FC<{
  pokemon: PokemonDetail;
  onClose: () => void;
}> = ({ pokemon, onClose }) => {
  const { darkMode } = useSelector((state: any) => state.mode);

  return (
    <>
      <Modal className="bg-white" dismissible show={true} onClose={onClose}>
        <ModalBody
          className={`${
            darkMode ? "bg-black text-white" : "bg-white text-black"
          } overflow-hidden`}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold capitalize">{pokemon.name}</h2>
            <button
              onClick={onClose} 
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              <IoMdClose />
            </button>
          </div>
          <div className="flex justify-center">
            <img
              src={
                pokemon.sprites.other?.["official-artwork"]?.front_default ||
                pokemon.sprites.front_default
              }
              alt={pokemon.name}
              className="w-[80%] mb-4"
            />
          </div>

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
        </ModalBody>
      </Modal>
    </>
  );
};

export default ModalExample;
