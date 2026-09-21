/* Tic-tac-toe engine - pure logic, shared by the app and node tests.
   Board: array of 9 cells, each 'X', 'O', or null. */
(function (global) {
  'use strict';

  var LINES = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  /* Returns {player:'X'|'O', line:[a,b,c]} on a win, {player:'draw'} on a full board, else null. */
  function result(board) {
    for (var i = 0; i < LINES.length; i++) {
      var a = LINES[i][0], b = LINES[i][1], c = LINES[i][2];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return { player: board[a], line: LINES[i] };
      }
    }
    for (var j = 0; j < 9; j++) if (!board[j]) return null;
    return { player: 'draw' };
  }

  function emptyCells(board) {
    var out = [];
    for (var i = 0; i < 9; i++) if (!board[i]) out.push(i);
    return out;
  }

  /* Minimax from `player`'s perspective; score is positive when `ai` wins, sooner is better. */
  function minimax(board, turn, ai, depth) {
    var res = result(board);
    if (res) {
      if (res.player === 'draw') return 0;
      return res.player === ai ? 10 - depth : depth - 10;
    }
    var human = ai === 'X' ? 'O' : 'X';
    var scores = [];
    var cells = emptyCells(board);
    for (var i = 0; i < cells.length; i++) {
      board[cells[i]] = turn;
      scores.push(minimax(board, turn === 'X' ? 'O' : 'X', ai, depth + 1));
      board[cells[i]] = null;
    }
    if (turn === ai) return Math.max.apply(null, scores);
    return Math.min.apply(null, scores);
  }

  /* Best move index for `ai` (unbeatable). Ties broken toward earlier cells. */
  function bestMove(board, ai) {
    var cells = emptyCells(board);
    var best = -Infinity, bestIdx = cells[0];
    for (var i = 0; i < cells.length; i++) {
      board[cells[i]] = ai;
      var s = minimax(board, ai === 'X' ? 'O' : 'X', ai, 1);
      board[cells[i]] = null;
      if (s > best) { best = s; bestIdx = cells[i]; }
    }
    return bestIdx;
  }

  /* Casual move: random empty cell. */
  function randomMove(board, rand) {
    var cells = emptyCells(board);
    return cells[Math.floor(rand() * cells.length)];
  }

  var api = { LINES: LINES, result: result, emptyCells: emptyCells, bestMove: bestMove, randomMove: randomMove };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else global.TicTacToe = api;
})(typeof window !== 'undefined' ? window : globalThis);
