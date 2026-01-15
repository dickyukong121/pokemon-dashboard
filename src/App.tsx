import DashboardContainer from "@/components/dashboard-container";
import { useSpring, useSprings, animated } from "@react-spring/web";
import styles from "./styles.module.css";
import { useRef, useState } from "react";
import useMeasure from "react-use-measure";
import { useDrag } from "react-use-gesture";
import clamp from "lodash.clamp";
import {Test, Test1, Test2} from "./test";

export default function App() {
  return (
    <>
    <DashboardContainer/>
      {/* <Test2 /> */}
    </>
  );
}
