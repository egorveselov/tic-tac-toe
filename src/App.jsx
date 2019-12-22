import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PlayerInfo from './components/PlayerInfo';
import GameField from './components/GameField';
import NewGameWindow from './components/NewGameWindow';
import Results from './components/Results';
import { changeNewGameState } from './actions/actions';
import './App.scss';

function App() {
  const dispatch = useDispatch();
  const playerOne = useSelector(state => state.paramsReducer.playerOne);
  const playerTwo = useSelector(state => state.paramsReducer.playerTwo);

  return (
    <>
      <NewGameWindow />
      <Results />
      <PlayerInfo player={playerOne} playerNumber={1} />
      <GameField />
      <button onClick={() => {dispatch(changeNewGameState(true))}}>New game</button>
      <PlayerInfo player={playerTwo} playerNumber={2} />
    </>
  );
}

export default App;
