import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { changePlayerOneTime, changePlayerTwoTime } from "../actions/actions";

function PlayerInfo(props) {
  const dispatch = useDispatch();
  const whoseTurn = useSelector(state => state.paramsReducer.whoseTurn);
  const showResults = useSelector(
    state => state.modalReducer.showResults.state
  );
  const totalTime = useSelector(state => state.timeReducer.totalTime);

  const changeStyle = sign => {
    let color = sign === whoseTurn ? "green" : "white";
    return { backgroundColor: color };
  };

  useEffect(() => {
    let timer;
    if (props.player.sign === whoseTurn && showResults !== true) {
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
  }, [props, whoseTurn, totalTime, dispatch, showResults]);

  return (
    <div className="inline" style={changeStyle(props.player.sign)}>
      <div>Player: {props.player.name}</div>
      <div>Playing: {props.player.sign}</div>
      <div>
        Seconds:{" "}
        {props.playerNumber === 1 ? totalTime.playerOne : totalTime.playerTwo}
      </div>
    </div>
  );
}

export default PlayerInfo;
