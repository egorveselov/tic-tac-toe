import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../actions/actions";
import CellState from "../enums/CellState";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

function NewGameWindow() {
  const dispatch = useDispatch();
  const showNewGame = useSelector(state => state.modalReducer.showNewGame);

  const [fieldSize, setFieldSize] = useState(3);
  const [chainLength, setChainLength] = useState(3);
  const [playerOne, setPlayerOne] = useState("");
  const [playerTwo, setPlayerTwo] = useState("");

  const handleChange = event => {
    const target = event.target;
    switch (target.name) {
      case "fieldSize":
        setFieldSize(target.value);
        break;
      case "chainLength":
        setChainLength(target.value);
        break;
      case "playerOneName":
        setPlayerOne(target.value);
        break;
      case "playerTwoName":
        setPlayerTwo(target.value);
        break;
      default:
        break;
    }
  };

  const createArray = fieldSize => {
    const valueArray = [];
    for (let i = 0; i < fieldSize; i++) {
      valueArray[i] = [];
      for (let j = 0; j < fieldSize; j++) {
        valueArray[i][j] = CellState.EMPTY;
      }
    }
    return valueArray;
  };

  const startNewGame = () => {
    if (!checkParams()) {
      return;
    }

    let info = whoStarts();

    dispatch(actions.changeWhoseTurn(CellState.X));
    dispatch(actions.changeCounterValue(1));
    dispatch(actions.resetTimers());
    dispatch(
      actions.changeGameParams(
        createArray(fieldSize),
        fieldSize,
        chainLength,
        { name: playerOne, sign: info[0] },
        { name: playerTwo, sign: info[1] },
        1
      )
    );
    dispatch(actions.changeNewGameState(false));

    setPlayerOne("");
    setPlayerTwo("");
  };

  const checkParams = () => {
    const result =
      fieldSize >= chainLength
        ? playerOne !== ""
          ? playerTwo !== ""
            ? true
            : false
          : false
        : false;
    return result;
  };

  const whoStarts = () => {
    let whoFirst = Math.round(Math.random());
    let info = [];
    whoFirst === 0
      ? (info = [CellState.O, CellState.X])
      : (info = [CellState.X, CellState.O]);
    return info;
  };

  const useStyles = makeStyles(theme => ({
    formControl: {
      margin: theme.spacing(1),
      width: 200
    }
  }));

  const classes = useStyles();

  return (
    <Dialog open={showNewGame}>
      <DialogTitle id="form-dialog-title">Game parameters</DialogTitle>
      <DialogContent>
        <DialogContentText>Please choose game settings.</DialogContentText>
        <FormControl className={classes.formControl}>
          <InputLabel>Field size</InputLabel>
          <Select
            autoWidth
            name="fieldSize"
            value={fieldSize}
            onChange={handleChange}
          >
            <MenuItem value={3}>3x3</MenuItem>
            <MenuItem value={9}>9x9</MenuItem>
            <MenuItem value={27}>27x27</MenuItem>
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel>Chain length</InputLabel>
          <Select
            name="chainLength"
            value={chainLength}
            onChange={handleChange}
          >
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={5}>5</MenuItem>
          </Select>
        </FormControl>
        <Grid container spacing={0}>
          <Grid item xs={6}>
            <form noValidate autoComplete="off" className={classes.formControl}>
              <TextField
                name="playerOneName"
                label="First player"
                onChange={handleChange}
              />
            </form>
          </Grid>
          <Grid item xs={6}>
            <form noValidate autoComplete="off" className={classes.formControl}>
              <TextField
                name="playerTwoName"
                label="Second player"
                onChange={handleChange}
              />
            </form>
          </Grid>
        </Grid>
        <Button onClick={startNewGame}>Start</Button>
      </DialogContent>
      <DialogActions></DialogActions>
    </Dialog>
  );
}

export default NewGameWindow;
