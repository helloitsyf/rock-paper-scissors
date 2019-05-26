import GameLogic from "../GameLogic";

describe("generateRandomMove", () => {
  it("should return one of the moves", () => {
    let move = GameLogic.generateRandomMove();
    expect(GameLogic.moveList.includes(move));
  });
});

describe("determineOutcome", () => {
  it("should declare player 2 as winner if player 1 does not make a move in time", () => {
    let player2Move = GameLogic.generateRandomMove();
    let outcome = GameLogic.determineOutcome({
      player1Move: "default",
      player2Move
    });
    expect(outcome).toBe(player2Move);
  });

  it("should declare rock as winner in rock/scissors", () => {
    let outcome = GameLogic.determineOutcome({
      player1Move: "rock",
      player2Move: "scissors"
    });
    expect(outcome).toBe("rock");
  });

  it("should declare paper as winner in rock/paper", () => {
    let outcome = GameLogic.determineOutcome({
      player1Move: "rock",
      player2Move: "paper"
    });
    expect(outcome).toBe("paper");
  });

  it("should declare paper as winner in scissors/paper", () => {
    let outcome = GameLogic.determineOutcome({
      player1Move: "scissors",
      player2Move: "paper"
    });
    expect(outcome).toBe("scissors");
  });

  it("should declare draw if the same", () => {
    let outcome = GameLogic.determineOutcome({
      player1Move: "scissors",
      player2Move: "scissors"
    });
    expect(outcome).toBe("draw");
  });
});
