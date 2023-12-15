import { getAvailableTilesForKing } from "./getAvailableTilesForKing";
import { FIGURE_NAMES, ITile } from "../types";
import { getAvailableTiles } from "./getAvailableTiles";

export const availableTurnsToAvoidCheckMate = (
  king: ITile,
  tiles: ITile[][],
  figureCheckFrom: ITile
) => {
  const availableMovesForKing = getAvailableTilesForKing(king, tiles);
  const figuresCanSave = getFiguresToSave(figureCheckFrom, tiles);
  const figuresToBlock = getFiguresToBlock(figureCheckFrom, king, tiles);

  return {
    availableMovesForKing,
    figuresCanSave,
    figuresToBlock,
  };
};

const getFiguresToSave = (figureToEat: ITile, tiles: ITile[][]) => {
  // { id: tilesCanBeBlocked }
  const res: Record<string, ITile[]> = {};

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const tile = tiles[row][col];

      if (tile.color !== figureToEat.color) {
        const availableTurnsForTile = getAvailableTiles(tiles, tile);

        const tileToAttack = availableTurnsForTile.find(
          (tile) =>
            tile.rowIdx === figureToEat.rowIdx &&
            tile.colIdx === figureToEat.colIdx
        );

        if (tileToAttack) {
          if (tile.id) {
            res[tile.id] = [tileToAttack];
          }
        }
      }
    }
  }

  return res;
};

const getFiguresToBlock = (
  figureCheckFrom: ITile,
  king: ITile,
  tiles: ITile[][]
) => {
  switch (figureCheckFrom.name) {
    case FIGURE_NAMES.BISHOP:
      return bishopCheck(figureCheckFrom, king, tiles);
    case FIGURE_NAMES.ROOK:
      return rookCheck(figureCheckFrom, king, tiles);
    case FIGURE_NAMES.QUEEN:
      return queenCheck(figureCheckFrom, king, tiles);
  }

  return {};
};

const bishopCheck = (bishop: ITile, enemyKing: ITile, tiles: ITile[][]) => {
  const blockingMoves: ITile[] = [];

  const bishopRow = bishop.rowIdx;
  const bishopCol = bishop.colIdx;
  const kingRow = enemyKing.rowIdx;
  const kingCol = enemyKing.colIdx;

  if (Math.abs(bishopRow - kingRow) === Math.abs(bishopCol - kingCol)) {
    const rowDirection = bishopRow < kingRow ? 1 : -1;
    const colDirection = bishopCol < kingCol ? 1 : -1;

    for (
      let row = bishopRow + rowDirection, col = bishopCol + colDirection;
      row !== kingRow && col !== kingCol;
      row += rowDirection, col += colDirection
    ) {
      blockingMoves.push(tiles[row][col]);
    }
  }

  // { id: tilesCanBeBlocked }
  const res: Record<string, ITile[]> = {};

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const tile = tiles[row][col];

      if (tile.color !== bishop.color && tile.name !== FIGURE_NAMES.KING) {
        const availableMoves = getAvailableTiles(tiles, tile);

        for (const availableMove of availableMoves) {
          const foundTile = blockingMoves.find(
            (blockingTile) =>
              blockingTile.rowIdx === availableMove.rowIdx &&
              blockingTile.colIdx === availableMove.colIdx
          );

          if (foundTile) {
            if (tile.id) {
              if (res[tile.id]) {
                res[tile.id].push(availableMove);
              } else {
                res[tile.id] = [availableMove];
              }
            }
          }
        }
      }
    }
  }

  return res;
};

const rookCheck = (rook: ITile, enemyKing: ITile, tiles: ITile[][]) => {
  const blockingMoves: ITile[] = [];

  // Common row
  if (rook.rowIdx === enemyKing.rowIdx) {
    let min = Math.min(rook.colIdx, enemyKing.colIdx);
    let max = Math.max(rook.colIdx, enemyKing.colIdx);

    for (let colIdx = min; colIdx < max; colIdx++) {
      blockingMoves.push(tiles[rook.rowIdx][colIdx]);
    }
  }

  // Common diagonal
  if (rook.colIdx === enemyKing.colIdx) {
    let min = Math.min(rook.rowIdx, enemyKing.rowIdx);
    let max = Math.max(rook.rowIdx, enemyKing.rowIdx);

    console.log(min, max);

    for (let rowIdx = min; rowIdx < max; rowIdx++) {
      blockingMoves.push(tiles[rowIdx][rook.colIdx]);
    }
  }

  console.log(blockingMoves);

  // { id: tilesCanBeBlocked }
  const res: Record<string, ITile[]> = {};

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const tile = tiles[row][col];

      if (tile.color !== rook.color && tile.name !== FIGURE_NAMES.KING) {
        const availableMoves = getAvailableTiles(tiles, tile);

        for (const availableMove of availableMoves) {
          const foundTile = blockingMoves.find(
            (blockingTile) =>
              blockingTile.rowIdx === availableMove.rowIdx &&
              blockingTile.colIdx === availableMove.colIdx
          );

          if (foundTile) {
            if (tile.id) {
              if (res[tile.id]) {
                res[tile.id].push(availableMove);
              } else {
                res[tile.id] = [availableMove];
              }
            }
          }
        }
      }
    }
  }

  return res;
};

const queenCheck = (queen: ITile, enemyKing: ITile, tiles: ITile[][]) => {
  return {
    ...bishopCheck(queen, enemyKing, tiles),
    ...rookCheck(queen, enemyKing, tiles),
  };
};
