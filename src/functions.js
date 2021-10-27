//shuffle array
export const shuffleIt = (array) => array.sort((a, b) => 0.5 - Math.random());
//1 - generate an array with values
export function generateValues(values, numberOfpieces) {
  const allValues = shuffleIt([...values]);
  const gameValues = shuffleIt([
    ...allValues.slice(0, numberOfpieces),
    ...allValues.slice(0, numberOfpieces),
  ]);
  return gameValues;
}
//2 - use values to generate an array with pieces objects
export function generateGamePieces(gameValues) {
  const gamePieces = gameValues.map((e) => {
    const piece = { value: e, id: Math.random(), active: false };
    return piece;
  });
  return gamePieces;
}
//3 - Get pieces will return pieces ready for game
export function getPieces(piecesAvailable, numberOfPieces) {
  const gamePieces = generateGamePieces(
    generateValues(piecesAvailable, numberOfPieces)
  );
  return gamePieces;
}
