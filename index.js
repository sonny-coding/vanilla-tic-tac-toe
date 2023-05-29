const game = {
  xTurn: true,
  xState: [],
  oState: [],
  winningStates: [
    // Rows
    ["0", "1", "2"],
    ["3", "4", "5"],
    ["6", "7", "8"],

    // Columns
    ["0", "3", "6"],
    ["1", "4", "7"],
    ["2", "5", "8"],

    // Diagonal
    ["0", "4", "8"],
    ["2", "4", "6"],
  ],
};

document.addEventListener("click", (event) => {
  // select clicked item
  const target = event.target;
  const isCell = target.classList.contains("grid-cell");
  const isDisabled = target.classList.contains("disabled");

  if (isCell && !isDisabled) {
    // dataset provides read/write access to custom data
    const cellValue = target.dataset.value;

    game.xTurn === true
      ? game.xState.push(cellValue)
      : game.oState.push(cellValue);

    target.classList.add("disabled");
    target.classList.add(game.xTurn ? "x" : "o");

    game.xTurn = !game.xTurn;

    // If all cells are disabled, then its draw
    if (!document.querySelectorAll(".grid-cell:not(.disabled)").length) {
      document.querySelector(".game-over").classList.add("visible");
      document.querySelector(".game-over-text").textContent = "Draw!";
    }

    // loop through each of the possible winning states
    game.winningStates.forEach((winningState) => {
      // check if each member in the winning state is in the xState or oState
      const xWins = winningState.every((item) => game.xState.includes(item));
      const oWins = winningState.every((item) => game.oState.includes(item));

      // if either x or o wins
      if (xWins || oWins) {
        document
          .querySelectorAll(".grid-cell")
          .forEach((cell) => cell.classList.add("disabled"));
        document.querySelector(".game-over").classList.add("visible");
        document.querySelector(".game-over-text").textContent = xWins
          ? "X wins!"
          : "O wins!";
      }
    });
  }
});

document.querySelector(".restart").addEventListener("click", () => {
  document.querySelector(".game-over").classList.remove("visible");
  document.querySelectorAll(".grid-cell").forEach((cell) => {
    cell.classList.remove("disabled", "x", "o");
  });

  game.xTurn = true;
  game.xState = [];
  game.oState = [];
});
