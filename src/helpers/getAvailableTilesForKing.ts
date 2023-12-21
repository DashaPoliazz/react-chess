import { COLORS, FIGURE_NAMES, ITile } from "../types";
import { findFigure } from "./findFigure";
import { getAvailableTiles } from "./getAvailableTiles";
import { isKingInCheck } from "./isKingInCheck";
import { isKingUnderAttack } from "./isKingUnderAttack";

const addTileToRemove = (
  availableTiles: (ITile | null)[],
  rowIdx: number,
  colIdx: number
): void => {
  const idx = availableTiles.findIndex(
    (tile) => tile?.rowIdx === rowIdx && tile?.colIdx === colIdx
  );

  if (idx !== -1) {
    availableTiles[idx] = null;
  }
};

const removeTilesInLine = (
  availableTiles: (ITile | null)[],
  king: ITile,
  line: (ITile | null)[]
): void => {
  for (const tile of line) {
    if (tile?.rowIdx === king.rowIdx) {
      addTileToRemove(availableTiles, king.rowIdx, tile.colIdx);
    } else if (tile?.colIdx === king.colIdx) {
      addTileToRemove(availableTiles, tile.rowIdx, king.colIdx);
    }
  }
};

const removeTilesInDiagonal = (
  availableTiles: (ITile | null)[],
  king: ITile,
  diagonal: (ITile | null)[]
): void => {
  for (const tile of diagonal) {
    if (tile) {
      addTileToRemove(availableTiles, tile.rowIdx, tile.colIdx);
    }
  }
};

export const getAvailableTilesForKing = (
  king: ITile,
  tiles: ITile[][]
): ITile[] => {
  const availableTiles: (ITile | null)[] = getAvailableTiles(tiles, king);

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const tile = tiles[row][col];

      if (tile.name && tile.color !== king.color) {
        const availableTilesForEnemyFigure = getAvailableTiles(tiles, tile);

        for (const availableTileForEnemyFigure of availableTilesForEnemyFigure) {
          const idx = availableTiles.findIndex(
            (t) =>
              t?.rowIdx === availableTileForEnemyFigure.rowIdx &&
              t?.colIdx === availableTileForEnemyFigure.colIdx
          );

          if (tile.name !== FIGURE_NAMES.PAWN && idx !== -1) {
            availableTiles[idx] = null;
          }
        }

        if (tile.name === FIGURE_NAMES.QUEEN) {
          if (king.rowIdx === tile.rowIdx) {
            removeTilesInLine(availableTiles, king, tiles[row]);
          } else if (king.colIdx === tile.colIdx) {
            const column = tiles.map((r) => r[col]);
            removeTilesInLine(availableTiles, king, column);
          } else if (
            Math.abs(king.rowIdx - tile.rowIdx) ===
            Math.abs(king.colIdx - tile.colIdx)
          ) {
            const directionRow = Math.sign(king.rowIdx - tile.rowIdx);
            const directionCol = Math.sign(king.colIdx - tile.colIdx);
            let currentRow = tile.rowIdx + directionRow;
            let currentCol = tile.colIdx + directionCol;

            const diagonal: (ITile | null)[] = [];

            while (
              currentRow >= 0 &&
              currentRow < 8 &&
              currentCol >= 0 &&
              currentCol < 8
            ) {
              diagonal.push(tiles[currentRow][currentCol]);

              currentRow += directionRow;
              currentCol += directionCol;
            }

            removeTilesInDiagonal(availableTiles, king, diagonal);
          }
        }

        if (
          (tile.name === FIGURE_NAMES.ROOK ||
            tile.name === FIGURE_NAMES.BISHOP) &&
          isKingUnderAttack(king, availableTilesForEnemyFigure)
        ) {
          if (king.rowIdx === tile.rowIdx) {
            removeTilesInLine(availableTiles, king, tiles[row]);
          } else if (king.colIdx === tile.colIdx) {
            const column = tiles.map((r) => r[col]);
            removeTilesInLine(availableTiles, king, column);
          } else if (
            Math.abs(king.rowIdx - tile.rowIdx) ===
            Math.abs(king.colIdx - tile.colIdx)
          ) {
            const directionRow = Math.sign(king.rowIdx - tile.rowIdx);
            const directionCol = Math.sign(king.colIdx - tile.colIdx);
            let currentRow = tile.rowIdx + directionRow;
            let currentCol = tile.colIdx + directionCol;

            const diagonal: (ITile | null)[] = [];

            while (
              currentRow >= 0 &&
              currentRow < 8 &&
              currentCol >= 0 &&
              currentCol < 8
            ) {
              diagonal.push(tiles[currentRow][currentCol]);

              currentRow += directionRow;
              currentCol += directionCol;
            }

            removeTilesInDiagonal(availableTiles, king, diagonal);
          }
        }

        if (tile.name === FIGURE_NAMES.PAWN) {
          const availableTilesForPawn: ITile[] = [];

          if (tile.color === COLORS.WHITE) {
            let rowIdx = 0;

            if (tile.rowIdx - 1 >= 0) {
              rowIdx = tile.rowIdx - 1;
              if (tile.colIdx - 1 >= 0) {
                availableTilesForPawn.push(tiles[rowIdx][tile.colIdx - 1]);
              }
              if (tile.colIdx + 1 <= 7) {
                availableTilesForPawn.push(tiles[rowIdx][tile.colIdx + 1]);
              }
            }
          }

          if (tile.color === COLORS.BLACK) {
            let rowIdx = 0;

            if (tile.rowIdx + 1 <= 7) {
              rowIdx = tile.rowIdx + 1;
              if (tile.colIdx - 1 >= 0) {
                availableTilesForPawn.push(tiles[rowIdx][tile.colIdx - 1]);
              }
              if (tile.colIdx + 1 <= 7) {
                availableTilesForPawn.push(tiles[rowIdx][tile.colIdx + 1]);
              }
            }
          }

          for (const availableTileForPawn of availableTilesForPawn) {
            const idx = availableTiles.findIndex(
              (t) =>
                t?.rowIdx === availableTileForPawn.rowIdx &&
                t?.colIdx === availableTileForPawn.colIdx
            );

            if (idx !== -1) {
              availableTiles[idx] = null;
            }
          }
        }
      }
    }
  }

  const result = availableTiles.filter(Boolean) as ITile[];

  return result;
};
