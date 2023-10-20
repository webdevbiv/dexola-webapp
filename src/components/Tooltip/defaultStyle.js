// default style of Tooltip
export const defaultStyle = {
  backgroundColor: "rgba(255, 255, 255, 1)",
  background: "rgba(255, 255, 255, 1)",
  color: "black",
  padding: "8px 12px",
  fontSize: "14px",
  lineHeight: "1.14",
  borderRadius: "0",
};

// get MaxWidth of Tooltip based on id
export const getMaxWidth = (id) => {
  if (id === "stakedBalance") {
    return "165px";
  } else if (id === "apr") {
    return "349px";
  } else if (id === "rewards") {
    return "152px";
  }
};
