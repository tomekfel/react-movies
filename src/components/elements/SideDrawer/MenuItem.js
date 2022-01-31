import * as React from "react";
import { motion } from "framer-motion";

const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
      x: "0",
    },
    x: "0",
    //
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
    x: "-150%",
  },
};

const colors = [
  "#FF008C",
  "#D309E1",
  "#9C1AFF",
  "#7700FF",
  "#4400FF",
  "#2200FF",
];

export const MenuItem = ({ element, index, passedFunction }) => {
  const style = { border: `2px solid ${colors[index]}` };

  const handleClick = (event) => {
    passedFunction(event.target.id);
  };

  let text = "";
  switch (element) {
    case 1:
      text = "Yesterday";
      break;
    case 7:
      text = "Week Ago";
      break;
    case 14:
      text = "2 Weeks Ago";
      break;
    case 30:
      text = "Month Ago";
      break;
    case 9999:
      text = "All Time";
      break;
    default:
      text = null;
  }

  return index === 0 ? (
    <motion.li variants={variants}>
      <div className="text-placeholder">Movies released</div>
    </motion.li>
  ) : (
    <motion.li
      variants={variants}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <div
        className="icon-placeholder"
        style={style}
        value={element}
        onClick={handleClick}
      />
      <div className="text-placeholder" id={element} onClick={handleClick}>
        {text}
      </div>
    </motion.li>
  );
};
