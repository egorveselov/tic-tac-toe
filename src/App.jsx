import React from "react";
import { useSelector, useDispatch } from "react-redux";
import PlayerInfo from "./components/PlayerInfo";
import GameField from "./components/GameField";
import NewGameWindow from "./components/NewGameWindow";
import Results from "./components/Results";
import { changeNewGameState } from "./actions/actions";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import "./App.scss";
import { Grid } from "@material-ui/core";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

function App() {
  const dispatch = useDispatch();
  const playerOne = useSelector(state => state.paramsReducer.playerOne);
  const playerTwo = useSelector(state => state.paramsReducer.playerTwo);

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: "#ff5252"
      }
    }
  });

  return (
    <>
      <MuiThemeProvider theme={theme}>
        <NewGameWindow />
        <Results />
        <Paper elevation={3} style={{ padding: "10px" }}>
          <Grid container spacing={2} direction="row">
            <Grid item xs>
              <GameField />
            </Grid>
            <Grid item xs>
              <Grid
                container
                spacing={1}
                direction="column"
                alignItems="center"
                justify="flex-start"
              >
                <Grid item xs={12}>
                  <PlayerInfo player={playerOne} playerNumber={1} />
                </Grid>
                <Grid item xs={12}>
                  <PlayerInfo player={playerTwo} playerNumber={2} />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    style={{ width: "200px" }}
                    variant="contained"
                    onClick={() => {
                      dispatch(changeNewGameState(true));
                    }}
                  >
                    New game
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </MuiThemeProvider>
    </>
  );
}

export default App;
