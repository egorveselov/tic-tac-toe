import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { changePlayerOneTime, changePlayerTwoTime } from "../actions/actions";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import "./Cell.scss";

function PlayerInfo(props) {
  const dispatch = useDispatch();
  const whoseTurn = useSelector(state => state.paramsReducer.whoseTurn);
  const showResults = useSelector(
    state => state.modalReducer.showResults.state
  );
  const showNewGame = useSelector(state => state.modalReducer.showNewGame);
  const totalTime = useSelector(state => state.timeReducer.totalTime);

  useEffect(() => {
    let timer;
    if (
      props.player.sign === whoseTurn &&
      showResults !== true &&
      showNewGame !== true
    ) {
      timer = setTimeout(() => {
        let sec =
          (props.playerNumber === 1
            ? totalTime.playerOne
            : totalTime.playerTwo) + 1;
        dispatch(
          props.playerNumber === 1
            ? changePlayerOneTime(sec)
            : changePlayerTwoTime(sec)
        );
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [props, whoseTurn, totalTime, dispatch, showResults, showNewGame]);

  const useStyles = makeStyles(theme => ({
    root: {
      padding: theme.spacing(3, 2),
      backgroundColor: props.player.sign === whoseTurn ? "#ff5252" : "white",
      color: props.player.sign === whoseTurn ? "white" : "black",
      width: 300
    }
  }));

  const classes = useStyles();

  return (
    <Paper elevation={3} className={classes.root}>
      <Typography variant="h4" gutterBottom>
        Player: {props.player.name}
      </Typography>
      <Divider />
      <Typography variant="h5" gutterBottom>
        Seconds:{" "}
        {props.playerNumber === 1 ? totalTime.playerOne : totalTime.playerTwo}
      </Typography>
      <img
        src={
          props.player.sign === "X" ? "images/cross.png" : "images/circle.png"
        }
        alt=""
        className="imgPlayerInfo"
      />
    </Paper>
  );
}

export default PlayerInfo;
