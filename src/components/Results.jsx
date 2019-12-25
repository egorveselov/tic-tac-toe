import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeResultsState, changeNewGameState } from "../actions/actions";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";

function Results() {
  const dispatch = useDispatch();
  const showResults = useSelector(state => state.modalReducer.showResults);
  const playerOne = useSelector(state => state.paramsReducer.playerOne);
  const playerTwo = useSelector(state => state.paramsReducer.playerTwo);
  const playerOneTime = useSelector(
    state => state.timeReducer.totalTime.playerOne
  );
  const playerTwoTime = useSelector(
    state => state.timeReducer.totalTime.playerTwo
  );

  const getPlayerData = name => {
    let playerData = JSON.parse(localStorage.getItem(name));
    if (playerData === null) playerData = {};
    return playerData;
  };

  const useStyles = makeStyles(theme => ({
    formControl: {
      margin: theme.spacing(1)
    }
  }));

  const classes = useStyles();

  let resultTitle = showResults.text === undefined ? " " : showResults.text;

  return (
    <Dialog aria-labelledby="winner-dialog-title" open={showResults.state}>
      <DialogTitle id="winner-dialog-title">{resultTitle}</DialogTitle>
      <Divider />
      <DialogContent>
        <DialogContentText>Game infofmation.</DialogContentText>
        <Typography
          variant="subtitle1"
          gutterBottom
          className={classes.formControl}
        >
          Player {playerOne.name} spent {playerOneTime} sec on game. Played{" "}
          {getPlayerData(playerOne.name).games} games. Wins{" "}
          {getPlayerData(playerOne.name).wins}.
        </Typography>

        <Typography
          variant="subtitle1"
          gutterBottom
          className={classes.formControl}
        >
          Player {playerTwo.name} spent {playerTwoTime} sec on game. Played{" "}
          {getPlayerData(playerTwo.name).games} games. Wins{" "}
          {getPlayerData(playerTwo.name).wins}.
        </Typography>

        <Button
          onClick={() => {
            dispatch(changeNewGameState(true));
            dispatch(changeResultsState(false, false));
          }}
        >
          New game
        </Button>
      </DialogContent>
      <DialogActions></DialogActions>
    </Dialog>
  );
}

export default Results;
