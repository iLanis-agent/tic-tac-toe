# Tic Tac Toe

You vs the machine. Unbeatable mode runs a full minimax search - the best you can do is
a draw. Casual mode plays random moves. Pick X or O; the score between visits is kept in
`localStorage`.

- No signup, nothing to install - pure static HTML/JS
- `engine.js` holds the game logic as pure functions, shared between the app and node tests

## Play

Open `index.html`, or visit the deployed site.

## Run locally

Any static server works:

```
python3 -m http.server
```

Then open http://localhost:8000/.

## Engine tests

The node test suite covers win/draw detection and proves the AI never loses across
hundreds of simulated games against a random opponent.
