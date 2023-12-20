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

  console.log(availableMovesForKing);

  return {
    availableMovesForKing,
    figuresCanSave,
    figuresToBlock,
  };
};

const getFiguresToSave = (figureToEat: ITile, tiles: ITile[][]) => {
  const res: Record<string, ITile[]> = {};

  tiles.forEach((row) => {
    row.forEach((tile) => {
      if (tile.color !== figureToEat.color) {
        const availableTurnsForTile = getAvailableTiles(tiles, tile);

        const tileToAttack = availableTurnsForTile.find(
          ({ rowIdx, colIdx }) =>
            rowIdx === figureToEat.rowIdx && colIdx === figureToEat.colIdx
        );

        if (tileToAttack && tile.id) {
          res[tile.id] = [tileToAttack];
        }
      }
    });
  });

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
    default:
      return {};
  }
};

const bishopCheck = (bishop: ITile, enemyKing: ITile, tiles: ITile[][]) => {
  const blockingMoves: ITile[] = [];
  const { rowIdx: bishopRow, colIdx: bishopCol } = bishop;
  const { rowIdx: kingRow, colIdx: kingCol } = enemyKing;

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

  const res: Record<string, ITile[]> = {};

  tiles.forEach((row) => {
    row.forEach((tile) => {
      if (tile.color !== bishop.color && tile.name !== FIGURE_NAMES.KING) {
        const availableMoves = getAvailableTiles(tiles, tile);

        availableMoves.forEach((availableMove) => {
          const foundTile = blockingMoves.find(
            (blockingTile) =>
              blockingTile.rowIdx === availableMove.rowIdx &&
              blockingTile.colIdx === availableMove.colIdx
          );

          if (foundTile && tile.id) {
            res[tile.id] = res[tile.id]
              ? [...res[tile.id], availableMove]
              : [availableMove];
          }
        });
      }
    });
  });

  return res;
};

const rookCheck = (rook: ITile, enemyKing: ITile, tiles: ITile[][]) => {
  const blockingMoves: ITile[] = [];

  if (rook.rowIdx === enemyKing.rowIdx) {
    const min = Math.min(rook.colIdx, enemyKing.colIdx);
    const max = Math.max(rook.colIdx, enemyKing.colIdx);

    for (let colIdx = min; colIdx < max; colIdx++) {
      blockingMoves.push(tiles[rook.rowIdx][colIdx]);
    }
  }

  if (rook.colIdx === enemyKing.colIdx) {
    const min = Math.min(rook.rowIdx, enemyKing.rowIdx);
    const max = Math.max(rook.rowIdx, enemyKing.rowIdx);

    for (let rowIdx = min; rowIdx < max; rowIdx++) {
      blockingMoves.push(tiles[rowIdx][rook.colIdx]);
    }
  }

  const res: Record<string, ITile[]> = {};

  tiles.forEach((row) => {
    row.forEach((tile) => {
      if (tile.color !== rook.color && tile.name !== FIGURE_NAMES.KING) {
        const availableMoves = getAvailableTiles(tiles, tile);

        availableMoves.forEach((availableMove) => {
          const foundTile = blockingMoves.find(
            (blockingTile) =>
              blockingTile.rowIdx === availableMove.rowIdx &&
              blockingTile.colIdx === availableMove.colIdx
          );

          if (foundTile && tile.id) {
            res[tile.id] = res[tile.id]
              ? [...res[tile.id], availableMove]
              : [availableMove];
          }
        });
      }
    });
  });

  return res;
};

const queenCheck = (queen: ITile, enemyKing: ITile, tiles: ITile[][]) => {
  return {
    ...bishopCheck(queen, enemyKing, tiles),
    ...rookCheck(queen, enemyKing, tiles),
  };
};
