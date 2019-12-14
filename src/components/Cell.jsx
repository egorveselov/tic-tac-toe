import React from "react";
import PropTypes from "prop-types";

function Cell(props) {
  return <div onClick={() => props.changeCellValue(props.x, props.y)}>{props.value}</div>;
}

Cell.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  value: PropTypes.string.isRequired,
  changeCellValue: PropTypes.func.isRequired
};

export default Cell;
