import { useState } from "react";
import PropTypes from "prop-types";
import { Tooltip as TooltipReact } from "react-tooltip";
import { TooltipModal } from "../TooltipModal/TooltipModal";
import { useWindowWidth } from "../../Hooks";
import { MEDIUM_WIDTH } from "../../constants/constants";
import infoImg from "../../assets/images/icons/info.svg";
import s from "./Tooltip.module.scss";

export const Tooltip = ({ text, id }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const windowWidth = useWindowWidth();
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

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
    <>
      {windowWidth >= MEDIUM_WIDTH ? (
        <div className={s.container}>
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
      ) : (
        <>
          <div
            className={s.container}
            onClick={toggleModal}
          >
            <img
              src={infoImg}
              alt='info'
              className={s.infoIcon}
            />
          </div>
          {isModalOpen && (
            <TooltipModal
              onClick={toggleModal}
              text={text}
              isActive={isModalOpen}
              id={id}
            />
          )}
        </>
      )}
    </>
  );
};

Tooltip.propTypes = {
  text: PropTypes.any,
  id: PropTypes.any,
};
