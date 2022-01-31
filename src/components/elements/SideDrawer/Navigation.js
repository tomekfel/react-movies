import * as React from "react";
import { motion } from "framer-motion";
import { MenuItem } from "./MenuItem";

const variants = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    transition: { staggerChildren: 0.07, delayChildren: 0.2, x: "0" },
  }),
  closed: {
    clipPath: "circle(30px at 40px 40px)",
    transition: { staggerChildren: 0.05, staggerDirection: -1, x: "-150%" },
  },
};

export const Navigation = (props) => (
  <motion.ul variants={variants}>
    {itemIds.map((element, index) => (
      <MenuItem
        element={element}
        index={index}
        passedFunction={props.passedFunction}
      />
    ))}
  </motion.ul>
);

const itemIds = [0, 1, 7, 14, 30, 9999];
