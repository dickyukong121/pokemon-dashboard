import axios from 'axios';
import type { PokemonListResponse, PokemonDetail } from '@/types/pokemon';
import type { GenerationDetail, GenerationListResponse } from '@/types/generation';

export async function getGenerationList(): Promise<GenerationListResponse> {
  const res = await axios.get<GenerationListResponse>(
    `https://pokeapi.co/api/v2/generation`
  );
  return res.data;
}

export async function getGenerationDetail(url: string): Promise<GenerationDetail> {
  const res = await axios.get<GenerationDetail>(url);
  return res.data;
}

export async function fetchGenerations(): Promise<GenerationDetail[]> {
  const list = await getGenerationList();
  const detailPromises = list.results.map((p) => getGenerationDetail(p.url));
  const details = await Promise.all(detailPromises);
  return details;
}
