import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Tooltip as TooltipReact } from "react-tooltip";
import { TooltipModal } from "../TooltipModal/TooltipModal";
import { useWindowWidth } from "../../Hooks";
import { MEDIUM_WIDTH } from "../../constants/constants";
import { defaultStyle, getMaxWidth } from "./defaultStyle";
import infoImg from "../../assets/images/icons/info.svg";
import s from "./Tooltip.module.scss";

export const Tooltip = ({ text, id }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalActive, setIsModalActive] = useState(false);

  const windowWidth = useWindowWidth();

  const openModal = () => {
    setIsModalOpen(true);
    setIsModalActive(true);
    document.body.style.overflow = "hidden"; // Disable scrolling on the body
  };

  const closeModal = () => {
    setIsModalActive(false);
    document.body.style.overflow = "auto"; // Enable scrolling on the body
  };

  useEffect(() => {
    let timeoutId;
    if (!isModalActive) {
      timeoutId = setTimeout(() => {
        setIsModalOpen(false);
      }, 600);
    }

    return () => clearTimeout(timeoutId);
  }, [isModalActive]);

  // get MaxWidth of Tooltip based on id
  let maxWidth = getMaxWidth(id);

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
            onClick={openModal}
          >
            <img
              src={infoImg}
              alt='info'
              className={s.infoIcon}
            />
          </div>
          {isModalOpen && (
            <TooltipModal
              onClick={closeModal}
              text={text}
              isActive={isModalActive}
              id={id}
            />
          )}
        </>
      )}
    </>
  );
};

Tooltip.propTypes = {
  text: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};
