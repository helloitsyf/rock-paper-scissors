const moveList = ["rock", "paper", "scissors"];
const moveCharacteristics = {
  rock: {
    wins: {
      scissors: true
    },
    loses: {
      paper: true
    },
    img: "/Assets/rock.png"
  },
  paper: {
    wins: {
      rock: true
    },
    loses: { scissors: true },
    img: "/Assets/paper.png"
  },
  scissors: {
    wins: { paper: true },
    loses: { rock: true },
    img: "/Assets/scissors.png"
  },
  default: {
    img: "/Assets/default.png"
  }
};

const generateRandomMove = () => {
  let index = Math.floor(Math.random() * 3);
  return moveList[index];
};

const determineOutcome = ({ player1Move, player2Move }) => {
  if (player1Move === "default") {
    return player2Move;
  }

  if (moveCharacteristics[player1Move].wins[player2Move] === true) {
    //player1 wins
    return player1Move;
  } else if (moveCharacteristics[player1Move].loses[player2Move] === true) {
    //player2 wins
    return player2Move;
  } else {
    //no one wins
    return "draw";
  }
};

export default {
  moveList,
  moveCharacteristics,
  generateRandomMove,
  determineOutcome
};
