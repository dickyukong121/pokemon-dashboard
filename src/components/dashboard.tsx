import type React from "react";
import type { PokemonDetail } from "@/types/pokemon";
import InfiniteScroll from "react-infinite-scroll-component";
import PokemonCard from "./pokemon-card";

const Dashboard: React.FC<{
  filtered: PokemonDetail[];
  fetchMoreData: () => void;
  hasMore: boolean;
  onSelect: (p: PokemonDetail) => void;
  error: string | null;
  retry: () => void;
  loading: boolean;
  searchMode: boolean;
}> = ({
  filtered,
  fetchMoreData,
  hasMore,
  onSelect,
  error,
  retry,
  loading,
  searchMode
}) => {
  if (loading) {
    return <div className="text-center p-10">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center p-10">
        <div className="text-red-500 p-2">
          {error}
          <button onClick={retry} className="underline ml-2">
            Try again
          </button>
        </div>
      </div>
    );
  }

  if (filtered.length === 0) {
    return <div className="text-center p-10">No Pokemons found.</div>;
  }

  return (
    <div className="flex flex-col">
      <InfiniteScroll
        dataLength={filtered.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={searchMode ? <p className="text-center p-10"></p> : <p className="text-center p-10">Loading more Pokemons...</p>}
        endMessage={<p className="text-center p-10">All Pokemons are shown.</p>}
      >
        {filtered.map((p) => (
          <PokemonCard key={p.id} pokemon={p} onSelect={onSelect} />
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default Dashboard;
