import React, { useEffect, useState } from "react";
import type { PokemonDetail } from "@/types/pokemon";
import { usePokemon } from "@/hooks/usePokemon";
import SearchInput from "@/components/search-input";
import Dashboard from "@/components/dashboard";
import PokemonModal from "@/components/pokemon-modal";

const DashboardContainer: React.FC = () => {
  const { pokemon, loading, error, hasMore, furtherFetch, retry } =
    usePokemon();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchMode, setSearchMode] = useState(false);
  const [selected, setSelected] = useState<PokemonDetail | null>(null);

  useEffect(() => {
    setSearchMode(searchTerm === "" ? false : true);
  }, [searchTerm]);

  const filtered = pokemon.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const fetchMoreData = () => {
    if (searchTerm) {
      return;
    }
    furtherFetch();
  };

  return (
    <>
      <header className="w-screen inset-x-0 fixed justify-center top-0 z-20 border-b bg-black p-4 mb-4">
        <div className="flex justify-center">
          <SearchInput value={searchTerm} onChange={setSearchTerm} />
        </div>
      </header>

      <main className="w-200 pt-25 min-h-screen flex flex-col items-center p-10">
        <Dashboard
          filtered={filtered}
          fetchMoreData={fetchMoreData}
          hasMore={hasMore}
          onSelect={setSelected}
          error={error}
          retry={retry}
          loading={loading}
          searchMode={searchMode}
        />

        {selected && (
          <PokemonModal pokemon={selected} onClose={() => setSelected(null)} />
        )}
      </main>
    </>
  );
};

export default DashboardContainer;
