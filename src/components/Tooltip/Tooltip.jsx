import PropTypes from "prop-types";
import { Tooltip as TooltipReact } from "react-tooltip";
import infoImg from "../../assets/images/icons/info.svg";
import s from "./Tooltip.module.scss";

export const Tooltip = ({ text, id }) => {
  const defaultStyle = {
    backgroundColor: "rgba(255, 255, 255, 1)",
    background: "rgba(255, 255, 255, 1)",
    color: "black",
    padding: "8px 12px",
    fontSize: "14px",
    lineHeight: "1.14",
    borderRadius: "0",
  };

  // Define maxWidth based on the id prop
  let maxWidth;
  if (id === "stakedBalance") {
    maxWidth = "165px";
  } else if (id === "apr") {
    maxWidth = "349px";
  } else if (id === "rewards") {
    maxWidth = "152px";
  }

  return (
    <div
      className={s.container}
      style={{
        opacity: "1",
      }}
    >
      <a id={id}>
        <img
          src={infoImg}
          alt='info'
          className={s.infoIcon}
        />
      </a>
      <TooltipReact
        anchorSelect={`#${id}`}
        place='top'
        style={{
          ...defaultStyle,
          maxWidth: maxWidth,
        }}
        opacity={1}
      >
        <div>{text}</div>
      </TooltipReact>
    </div>
  );
};

Tooltip.propTypes = {
  text: PropTypes.any,
  id: PropTypes.any,
};
