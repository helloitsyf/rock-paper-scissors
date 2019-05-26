import React, { Fragment } from "react";
import "./App.css";
import GameLogic from "./Services/GameLogic";

const playerMode = "PVC";
const comMode = "CVC";
const moveIntervalInSeconds = 5;
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: null,
      player1CurrentMove: null,
      player1History: [],
      player2CurrentMove: null,
      player2History: [],
      countdownTimer: null,
      roundOutcome: null,
      roundRef: null
    };
  }

  renderModeSelection = () => {
    return (
      <div className="mode-section">
        <div>Select Play Mode</div>
        <div
          className="mode-button mode-pvc"
          onClick={() => {
            this.selectMode(playerMode);
          }}
        >
          Player VS Computer
        </div>
        <div
          className="mode-button"
          onClick={() => {
            this.selectMode(comMode);
          }}
        >
          Computer VS Computer
        </div>
      </div>
    );
  };

  renderGameSection = () => {
    return (
      <div className="game-section">
        {this.renderPlayer2Section()}
        {this.renderTimerSection()}
        {this.renderPlayer1Section()}
        {this.renderResults()}
      </div>
    );
  };

  renderPlayer2Section = () => {
    return (
      <div className="player2-section">
        <div className="player-history-section">
          Player 2 history:
          {this.state.player2History.map(move => {
            return (
              <img src={GameLogic.moveCharacteristics[move].img} alt={move} />
            );
          })}
        </div>
        <div className="player-current-section">
          {this.state.player2CurrentMove !== null && (
            <img
              src={
                GameLogic.moveCharacteristics[this.state.player2CurrentMove].img
              }
              alt={this.state.player2CurrentMove}
            />
          )}
        </div>
      </div>
    );
  };

  renderTimerSection = () => {
    return (
      <div className="game-timer-section">
        <div className="game-timer">
          <div>Timer</div>
          <div>{this.state.countdownTimer}</div>
        </div>
      </div>
    );
  };

  renderPlayer1Section = () => {
    return (
      <div className="player1-section">
        <div className="player-current-section">
          {this.state.player1CurrentMove !== null ? (
            <img
              src={
                GameLogic.moveCharacteristics[this.state.player1CurrentMove].img
              }
              alt={this.state.player1CurrentMove}
            />
          ) : (
            this.state.mode === playerMode && (
              <Fragment>
                Please select a move
                <div className="player-select-move">
                  {GameLogic.moveList.map(move => {
                    return (
                      <img
                        className={`player-select-${move}`}
                        src={GameLogic.moveCharacteristics[move].img}
                        alt={move}
                        onClick={() => {
                          this.setState({ player1CurrentMove: move });
                        }}
                      />
                    );
                  })}
                </div>
              </Fragment>
            )
          )}
        </div>
        <div className="player-history-section">
          Player 1 history:
          {this.state.player1History.map(move => {
            if (move !== null) {
              return (
                <img src={GameLogic.moveCharacteristics[move].img} alt={move} />
              );
            }
          })}
        </div>
      </div>
    );
  };
  renderResults = () => {
    return (
      <Fragment>
        {this.state.roundOutcome !== null && (
          <div className="results-section">
            <div className="results-text">
              <div>
                {this.state.roundOutcome === this.state.player1CurrentMove &&
                  `${this.state.mode === playerMode ? "YOU" : "Player 1"} WIN`}
                {this.state.roundOutcome === this.state.player2CurrentMove &&
                  "Player 2 WIN"}
                {this.state.roundOutcome === "draw" && "ROUND DRAW"}
              </div>
              <div
                className="mode-button round-reset"
                onClick={() => {
                  this.resetRound();
                }}
              >
                Play Again
              </div>
              <div
                className="mode-button back-to-mode"
                onClick={() => {
                  this.setState({ mode: null });
                }}
              >
                Go Back
              </div>
            </div>
          </div>
        )}
      </Fragment>
    );
  };

  render() {
    return (
      <div className="App">
        {this.state.mode === null
          ? this.renderModeSelection()
          : this.renderGameSection()}
      </div>
    );
  }

  selectMode = mode => {
    this.setState({ mode: mode });
    this.startGame();
  };

  startGame = () => {
    this.resetRound();
    this.setState({
      player1History: [],
      player2History: []
    });
  };

  startRound = () => {
    this.setState({ countdownTimer: moveIntervalInSeconds });
    const roundRef = setInterval(() => {
      if (this.state.countdownTimer === 0) {
        this.generateMoves();
        this.determineOutcome();
      } else {
        this.setState({ countdownTimer: this.state.countdownTimer - 1 });
      }
    }, 1000);
    this.setState({ roundRef: roundRef });
  };

  generateMoves = () => {
    if (this.state.mode === comMode) {
      this.setState({
        player1CurrentMove: GameLogic.generateRandomMove(),
        player2CurrentMove: GameLogic.generateRandomMove()
      });
    } else if (this.state.mode === playerMode) {
      this.setState({
        player2CurrentMove: GameLogic.generateRandomMove()
      });
      if (this.state.player1CurrentMove === null) {
        this.setState({ player1CurrentMove: "default" });
      }
    }
  };

  determineOutcome = () => {
    let winner = GameLogic.determineOutcome({
      player1Move: this.state.player1CurrentMove,
      player2Move: this.state.player2CurrentMove
    });
    this.state.player1History.push(this.state.player1CurrentMove);
    this.state.player2History.push(this.state.player2CurrentMove);
    this.setState({ roundOutcome: winner });
    clearInterval(this.state.roundRef);
  };

  resetRound = () => {
    this.setState({
      player1CurrentMove: null,
      player2CurrentMove: null,
      countdownTimer: null,
      roundOutcome: null,
      roundRef: null
    });
    this.startRound();
  };
}

export default App;
