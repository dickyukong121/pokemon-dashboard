import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { requestSetMode, setMode } from "@/slices/modeSlice";
// import Button from "./button";
import { Button } from "flowbite-react";
import useGeneration from "@/hooks/useGeneration";
import { FaSun, FaMoon } from "react-icons/fa";
import { useSpring, animated } from "@react-spring/web";

const Navbar: React.FC<{}> = () => {
  const { generation, loading, error } = useGeneration();

  const dispatch = useDispatch();
  const { darkMode } = useSelector((state: any) => state.mode);
  const toggleDarkMode = () => {
    console.log(generation.map((g) => g.main_region.name));
    dispatch(requestSetMode(!darkMode));
  };
  const props2 = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
  });

  return (
    <nav
      className={` fixed w-full z-20 top-0 start-0 border-b border-default 
        ${darkMode ? "bg-black " : "bg-white"}`}
    >
      <animated.div style={props2} className="flex flex-wrap items-center justify-between mx-auto p-4 px-8">
        <a
          href="{{< param homepage >}}/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png"
            className="h-7"
            alt="Flowbite Logo"
          />
          <span className="self-center text-xl text-heading font-semibold whitespace-nowrap">
            Pokemon Dashboard
          </span>
          {/* <animated.div style={props2}>Hello World</animated.div> */}
        </a>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-body rounded-base md:hidden hover:bg-neutral-secondary-soft hover:text-heading focus:outline-none focus:ring-2 focus:ring-neutral-tertiary"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="items-center font-medium flex flex-col p-4 md:p-0 mt-4 border border-default rounded-base bg-neutral-secondary-soft md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-neutral-primary">
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-white bg-brand rounded md:bg-transparent md:text-fg-brand md:p-0"
                aria-current="page"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-heading rounded hover:bg-neutral-tertiary md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0 md:dark:hover:bg-transparent"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-heading rounded hover:bg-neutral-tertiary md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0 md:dark:hover:bg-transparent"
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-heading rounded hover:bg-neutral-tertiary md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0 md:dark:hover:bg-transparent"
              >
                Pricing
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-heading rounded hover:bg-neutral-tertiary md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0 md:dark:hover:bg-transparent"
              >
                Contact
              </a>
            </li>
            <li>
              <Button onClick={toggleDarkMode}>
                {darkMode ? (
                  <FaSun className={`h-5 w-5 }`} />
                ) : (
                  <FaMoon className={`h-5 w-5 }`} />
                )}
              </Button>
            </li>
          </ul>
        </div>
      </animated.div>
    </nav>
  );
};
export default Navbar;
