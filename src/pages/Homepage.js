import React, { useState, useEffect } from "react";
import { fruits, colors, words } from "../pieces";
import { getPieces } from "../functions";

const initialGameStatus = { pieceA: null, pieceB: null };
const initialGameSettings = {
  pieces: [],
  type: "",
  numberOfPieces: 4,
  matches: 0,
  score: 0,
};

export default function Homepage() {
  const [gamePieces, set_gamePieces] = useState([]);
  const [gameStatus, set_gameStatus] = useState(initialGameStatus);
  const [gameSettings, set_gameSettings] = useState(initialGameSettings);
  const [options, set_options] = useState(false);

  //First render
  useEffect(() => {
    loadBoard();
    console.log(gamePieces);
  }, []);
  //start a new game
  const startGame = (event) => {
    event.preventDefault();
    loadBoard();
    set_options(false);
    console.log(gamePieces);
  };

  //Load or reload board
  const loadBoard = () => {
    // const select = colors;
    // if (gameSettings.pieces === "fruits") {
    //   const select = fruits;
    // } else if (gameSettings.pieces === "colors") {
    //   const select = colors;
    // } else {
    //   const select = words;
    // }
    const pieces = getPieces(gameSettings.pieces, gameSettings.numberOfPieces);
    set_gamePieces(pieces);
    //set_gameSettings(initialGameSettings);
  };
  //Click on piece:
  function clickOnPiece(piece) {
    if (piece.active) {
      return;
    }
    if (!gameStatus.pieceA && !gameStatus.pieceB) {
      const newGamePieces = gamePieces.map((e) =>
        e.id === piece.id ? { ...e, active: true } : e
      );
      set_gamePieces(newGamePieces);
      set_gameStatus({ ...gameStatus, pieceA: piece });
    } else if (gameStatus.pieceA.id !== piece.id && !gameStatus.pieceB) {
      const newGamePieces = gamePieces.map((e) =>
        e.id === piece.id ? { ...e, active: true } : e
      );
      set_gamePieces(newGamePieces);
      set_gameStatus({ ...gameStatus, pieceB: piece });
    }
  }
  //when a new piece is set as active:
  useEffect(() => {
    console.log("1", gameStatus);
    if (gameStatus.pieceA && gameStatus.pieceB) {
      set_gameSettings({ ...gameSettings, score: gameSettings.score + 1 });
      console.log("2", gameStatus);
      if (gameStatus.pieceA.value === gameStatus.pieceB.value) {
        console.log("Match!!");
        set_gameSettings({ ...gameSettings, score: gameSettings.score + 1 });

        set_gameStatus(initialGameStatus);
        set_gameSettings({
          ...gameSettings,
          matches: gameSettings.matches + 1,
        });
      } else {
        console.log("WRONG!!");
        set_gameSettings({ ...gameSettings, score: gameSettings.score + 1 });

        setTimeout(() => {
          const newGamePieces = gamePieces.map((e) =>
            e.id === gameStatus.pieceA.id || e.id === gameStatus.pieceB.id
              ? { ...e, active: false }
              : e
          );
          set_gamePieces(newGamePieces);
          set_gameStatus(initialGameStatus);
        }, 800);
      }
    }
  }, [gameStatus]);

  useEffect(() => {
    console.log("points", gameSettings.matches);

    if (gameSettings.matches === gameSettings.numberOfPieces) {
      console.log("WIN");
      set_gameSettings(initialGameSettings);
    }
  }, [gameSettings.matches]);

  return (
    <div className="display">
      <div className="menu">
        {!options ? (
          <button onClick={() => set_options(true)} className="button">
            Start new game
          </button>
        ) : (
          <form onSubmit={startGame}>
            <label>number of pieces: </label>
            <input
              type="number"
              min="6"
              max="40"
              onChange={(event) =>
                set_gameSettings({
                  ...gameSettings,
                  numberOfPieces: event.target.value,
                })
              }
            ></input>
            <br />
            <input
              type="radio"
              id="fruits"
              name="piecestype"
              value="fruits"
              onChange={(event) =>
                set_gameSettings({
                  ...gameSettings,
                  pieces: fruits,
                  type: "fruits",
                })
              }
            />
            <label for="fruits">Fruits</label>
            <br />
            <input
              type="radio"
              id="colors"
              name="piecestype"
              value="colors"
              onChange={(event) =>
                set_gameSettings({
                  ...gameSettings,
                  pieces: colors,
                  type: "colors",
                })
              }
            />
            <label for="colors">Colors</label>
            <br />
            <input
              type="radio"
              id="words"
              name="piecestype"
              value="words"
              onChange={(event) =>
                set_gameSettings({
                  ...gameSettings,
                  pieces: words,
                  type: "words",
                })
              }
            />
            <label for="words">Words</label>
            <br />
            <button type="submit" className="button">
              Start
            </button>
          </form>
        )}
      </div>
      <div className="gameBoard">
        {gamePieces.map((e) => (
          <div
            className={`piece ${e.active ? "active" : ""}`}
            onClick={() => clickOnPiece(e)}
          >
            <div className="inner">
              {gameSettings.type === "colors" ? (
                <div
                  className="front"
                  style={{
                    backgroundColor: `${e.value}`,
                  }}
                ></div>
              ) : null}
              {gameSettings.type === "fruits" ? (
                <div className="front" style={{ backgroundColor: "white" }}>
                  <img className="image" src={`${e.value}`} />
                </div>
              ) : null}
              {gameSettings.type === "words" ? (
                <div className="front" style={{ backgroundColor: "white" }}>
                  <h2>{e.value}</h2>
                </div>
              ) : null}
              <div className="back">
                <img
                  className="image"
                  alt="card"
                  src="https://www.toptal.com/designers/subtlepatterns/patterns/double-bubble.png"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
