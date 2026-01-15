import type { DataDetail, DataListResponse } from "./data";

export interface GenerationListResponse extends DataListResponse {
  count: number;
}

export interface GenerationDetail extends DataDetail{
  main_region: { name: string; url: string };
  pokemon_species: { name: string; url: string }[];
}

