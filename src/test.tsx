import {
  use,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  useSpring,
  animated,
  useSpringRef,
  config,
  useTransition,
  useChain,
} from "@react-spring/web";
import { useDrag } from "react-use-gesture";

import styles from "./styles.module.css";
import { ReplaySubject, Subject } from "rxjs";

const left = {
  bg: `linear-gradient(120deg, #f093fb 0%, #f5576c 100%)`,
  justifySelf: "end",
};
const right = {
  bg: `linear-gradient(120deg, #96fbc4 0%, #f9f586 100%)`,
  justifySelf: "start",
};

const Slider = ({ children }: { children: ReactNode }) => {
  const [{ x, bg, scale, justifySelf }, api] = useSpring(() => ({
    x: 0,
    scale: 1,
    ...left,
  }));
  const bind = useDrag(({ active, movement: [x] }) =>
    api.start({
      x: active ? x : 0,
      scale: active ? 1.1 : 1,
      ...(x < 0 ? left : right),
      immediate: (name) => active && name === "x",
    })
  );

  const avSize = x.to({
    map: Math.abs,
    range: [50, 300],
    output: [0.5, 1],
    extrapolate: "clamp",
  });

  return (
    <animated.div
      {...bind()}
      className={styles.item}
      style={{ background: bg }}
    >
      <animated.div
        className={styles.av}
        style={{ scale: avSize, justifySelf }}
      />
      <animated.div className={styles.fg} style={{ x, scale }}>
        {children}
      </animated.div>
    </animated.div>
  );
};

export function Test1() {
  return (
    <div className={styles.container}>
      <Slider>Slide.</Slider>
    </div>
  );
}

export function Test() {
  const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }));

  // Set the drag hook and define component movement based on gesture data.
  const bind = useDrag(({ down, movement: [mx, my] }) => {
    console.log(down, mx, my);
    api.start({ x: down ? mx : 0, y: down ? my : 0 });
  });

  // Bind it to a component.
  return (
    <animated.div
      className={styles.fg}
      {...bind()}
      style={{ x, y, touchAction: "none" }}
    />
  );
}

export function Test2() {
  const [open, setOpen] = useState(false);
  const open$ = useRef(new ReplaySubject<void>(1));
  const springApi = useSpringRef();
  const { size, ...rest } = useSpring({
    ref: springApi,
    config: config.stiff,
    from: { size: "20%", background: "hotpink" },
    to: {
      size: open ? "100%" : "20%",
      background: open ? "white" : "hotpink",
      overflow: open ? "auto" : "hidden",
    },
  });

  const transApi = useSpringRef();
  const transition = useTransition(open ? data : [], {
    ref: transApi,
    trail: 400 / data.length,
    from: { opacity: 0, scale: 0 },
    enter: { opacity: 1, scale: 1 },
    leave: { opacity: 0, scale: 0 },
  });

  // This will orchestrate the two animations above, comment the last arg and it creates a sequence
  useChain(open ? [springApi, transApi] : [transApi, springApi], [
    0,
    open ? 1 : 0.6,
  ]);

  useEffect(() => {
    const timer = setTimeout(() => {
      open$.current.next();
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const subscription = open$.current.subscribe(() => {
      console.log(open);
      setOpen((open) => !open);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className={styles.wrapper}>
      <animated.div
        style={{ ...rest, width: size, height: size }}
        className={styles.container}
        onClick={() => setOpen((open) => !open)}
      >
        {transition((style, item) => (
          <animated.div
            className={styles.item}
            style={{ ...style, background: item.css }}
          />
        ))}
      </animated.div>
    </div>
  );
}

const data = [
  {
    name: "Rare Wind",
    description: "#a8edea → #fed6e3",
    css: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
    height: 200,
  },
  {
    name: "Saint Petersburg",
    description: "#f5f7fa → #c3cfe2",
    css: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
    height: 400,
  },
  {
    name: "Deep Blue",
    description: "#e0c3fc → #8ec5fc",
    css: "linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)",
    height: 400,
  },
  {
    name: "Ripe Malinka",
    description: "#f093fb → #f5576c",
    css: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    height: 400,
  },
  {
    name: "Perfect White",
    description: "#fdfbfb → #ebedee",
    css: "linear-gradient(135deg, #E3FDF5 0%, #FFE6FA 100%)",
    height: 400,
  },
  {
    name: "Near Moon",
    description: "#5ee7df → #b490ca",
    css: "linear-gradient(135deg, #5ee7df 0%, #b490ca 100%)",
    height: 400,
  },
  {
    name: "Wild Apple",
    description: "#d299c2 → #fef9d7",
    css: "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)",
    height: 200,
  },
  {
    name: "Ladoga Bottom",
    description: "#ebc0fd → #d9ded8",
    css: "linear-gradient(135deg, #ebc0fd 0%, #d9ded8 100%)",
    height: 400,
  },
  {
    name: "Sunny Morning",
    description: "#f6d365 → #fda085",
    css: "linear-gradient(135deg, #f6d365 0%, #fda085 100%)",
    height: 200,
  },
  {
    name: "Lemon Gate",
    description: "#96fbc4 → #f9f586",
    css: "linear-gradient(135deg, #96fbc4 0%, #f9f586 100%)",
    height: 400,
  },
  {
    name: "Salt Mountain",
    description: " #FFFEFF → #D7FFFE",
    css: "linear-gradient(135deg, #FFFEFF 0%, #D7FFFE 100%)",
    height: 200,
  },
  {
    name: "New York",
    description: " #fff1eb → #ace0f9",
    css: "linear-gradient(135deg, #fff1eb 0%, #ace0f9 100%)",
    height: 400,
  },
  {
    name: "Soft Grass",
    description: " #c1dfc4 → #deecdd",
    css: "linear-gradient(135deg, #c1dfc4 0%, #deecdd 100%)",
    height: 400,
  },
  {
    name: "Japan Blush",
    description: " #ddd6f3 → #faaca8",
    css: "linear-gradient(135deg, #ddd6f3 0%, #faaca8 100%, #faaca8 100%)",
    height: 200,
  },
  {
    name: "Japan Blush",
    description: " #ddd6f3 → #faaca8",
    css: "linear-gradient(135deg, #ddd6f3 0%, #faaca8 100%, #faaca8 100%)",
    height: 200,
  },
  {
    name: "Japan Blush",
    description: " #ddd6f3 → #faaca8",
    css: "linear-gradient(135deg, #ddd6f3 0%, #faaca8 100%, #faaca8 100%)",
    height: 200,
  },
  {
    name: "Japan Blush",
    description: " #ddd6f3 → #faaca8",
    css: "linear-gradient(135deg, #ddd6f3 0%, #faaca8 100%, #faaca8 100%)",
    height: 200,
  },
];
