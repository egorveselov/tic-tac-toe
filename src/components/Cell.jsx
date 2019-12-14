import React from "react";
import PropTypes from "prop-types";
import { ReactSVG } from "react-svg";
import CellState from "../enums/CellState";
import "./Cell.scss";

function Cell(props) {
  let icon = "";
  if (props.value === CellState.X) {
    icon = "images/close.svg";
  } else if (props.value === CellState.O) {
    icon = "images/circle.svg";
  }

  return (
    <ReactSVG
      className="icon"
      src={icon}
      onClick={() => props.changeCellValue(props.x, props.y)}
    />
  );
}

Cell.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  value: PropTypes.string.isRequired,
  changeCellValue: PropTypes.func.isRequired
};

export default Cell;
