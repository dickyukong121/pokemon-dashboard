import React, { useEffect, useState } from "react";
import type { PokemonDetail } from "@/types/pokemon";
import { usePokemon } from "@/hooks/usePokemon";
import Dashboard from "@/components/dashboard";
import PokemonModal from "@/components/pokemon-modal";
import SearchInput2 from "./search-input-two";
import Navbar from "./nav-bar";
import { Button } from "flowbite-react";
import { HiOutlineArrowRight, HiShoppingCart } from "react-icons/hi";
import ModalExample from "./modal";
import { useSpring, animated } from "@react-spring/web";

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

  const [open, toggle] = useState(false);
  const props = useSpring({ width: open ? 200 : 0 });

  return (
    <div className="flex flex-col">
      <Navbar />

      {/* 
      <header className="w-screen justify-center top-0 z-20 border-b bg-black p-4 mb-4">
        <div className="flex justify-center">
        </div>
      </header> */}

      <main className="w-200 pt-25 min-h-screen flex flex-col items-center p-10">
        <SearchInput2 value={searchTerm} onChange={setSearchTerm} />
        <Button color="green" pill>
          Green
        </Button>
        <Button color="red" pill>
          Red
        </Button>
        <Button color="yellow">Yellow</Button>
        <Button color="purple">Purple</Button>
        <Button className="bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 text-white hover:bg-gradient-to-br focus:ring-pink-300 dark:focus:ring-pink-800">
          Pink
        </Button>

        <div className="flex items-center h-full content-center">
          <div
            className="relative w-50 h-12.5 cursor-pointer border-r-1.25 border-white overflow-hidden"
            onClick={() => toggle(!open)}
          >
            <animated.div
              className="absolute top-0 left-0 w-full h-full bg-[#ff69b4]"
              style={props}
            />
            <animated.div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-[#272727]">
              {props.width.to((x) => x.toFixed(0))}
            </animated.div>
          </div>
        </div>

        {/* <DarkThemeToggle/> */}
        <div className="flex flex-wrap gap-2">
          <Button>
            <HiShoppingCart className="mr-2 h-5 w-5" />
            Buy now
          </Button>
          <Button>
            Choose plan
            <HiOutlineArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>

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
          <ModalExample pokemon={selected} onClose={() => setSelected(null)} />
          // <PokemonModal pokemon={selected} onClose={() => setSelected(null)} />
        )}
      </main>
    </div>
  );
};

export default DashboardContainer;
