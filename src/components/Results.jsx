import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Modal from "react-modal";
import { changeResultsState, changeNewGameState } from "../actions/actions";

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

  return (
    <Modal isOpen={showResults.state}>
      <div>
        <h1>{showResults.text}</h1>
        <div>
          Player {playerOne.name} spent {playerOneTime} on game. Played{" "}
          {getPlayerData(playerOne.name).games} games. Wins{" "}
          {getPlayerData(playerOne.name).wins}.
        </div>
        <div>
          Player {playerTwo.name} spent {playerTwoTime} on game. Played{" "}
          {getPlayerData(playerTwo.name).games}. Wins{" "}
          {getPlayerData(playerTwo.name).wins}.
        </div>
        <button
          onClick={() => {
            dispatch(changeResultsState(false, false));
            dispatch(changeNewGameState(true));
          }}
        >
          New Game
        </button>
      </div>
    </Modal>
  );
}

export default Results;
