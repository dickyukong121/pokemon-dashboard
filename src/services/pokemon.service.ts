import axios from 'axios';
import type { PokemonListResponse, PokemonDetail } from '@/types/pokemon';

export async function getPokemonList(limit = 50): Promise<PokemonListResponse> {
  const res = await axios.get<PokemonListResponse>(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}`
  );
  return res.data;
}

export async function getPokemonDetail(url: string): Promise<PokemonDetail> {
  const res = await axios.get<PokemonDetail>(url);
  return res.data;
}

export async function fetchPokemons(limit = 50): Promise<PokemonDetail[]> {
  const list = await getPokemonList(limit);
  const detailPromises = list.results.map((p) => getPokemonDetail(p.url));
  const details = await Promise.all(detailPromises);
  return details;
}

export async function fetchMorePokemons(
  currentCount: number,
  pageSize: number = 50
): Promise<PokemonDetail[]> {
  const newLimit = currentCount + pageSize;
  const fullList = await getPokemonList(newLimit);
  
  const newItems = fullList.results.slice(currentCount);
  const detailPromises = newItems.map((p) => getPokemonDetail(p.url));
  const details = await Promise.all(detailPromises);
  
  return details;
}