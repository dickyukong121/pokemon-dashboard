import type { DataDetail, DataListResponse } from "./data";

export interface PokemonListResponse extends DataListResponse {
}

export interface PokemonDetail extends DataDetail {
  sprites: {
    front_default: string;
    other: { "official-artwork": { front_default: string } };
  };
  types: { type: { name: string } }[];
  height: number;
  weight: number;
  abilities: { ability: { name: string } }[];
}