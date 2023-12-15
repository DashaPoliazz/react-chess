import { COLORS, FIGURE_NAMES, ITile } from "../types";
import { getAvailableTiles } from "./getAvailableTiles";
import { isKingInCheck } from "./isKingInCheck";
import { isKingUnderAttack } from "./isKingUnderAttack";
import { isTileCovered } from "./isTileCovered";

export const getAvailableTilesForKing = (
  king: ITile,
  tiles: ITile[][]
): ITile[] => {
  const availableTiles: (ITile | null)[] = getAvailableTiles(tiles, king);

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      // Enemy figure
      const tile = tiles[row][col];

      if (tile.name && tile.color !== king.color) {
        const availableTilesForEnemyFigure = getAvailableTiles(tiles, tile);

        for (const availableTileForEnemyFigure of availableTilesForEnemyFigure) {
          const idx = availableTiles.findIndex(
            (tile) =>
              tile?.rowIdx === availableTileForEnemyFigure.rowIdx &&
              tile?.colIdx === availableTileForEnemyFigure.colIdx
          );

          // Король может походить на клетку на которую может ходить пешка
          // Но не может походить на клетку которую под ударом пешки
          if (tile.name !== FIGURE_NAMES.PAWN) {
            if (idx !== -1) {
              availableTiles[idx] = null;
            }
          }
        }

        // Define diagonals for enemy figure
        // Queen
        if (tile.name === FIGURE_NAMES.QUEEN) {
          if (king.rowIdx === tile.rowIdx) {
            // Chcking for the same row
            const idxOftileToRemove = availableTiles.findIndex(
              (tile) => tile?.rowIdx === king?.rowIdx
            );
            availableTiles[idxOftileToRemove] = null;
          } else if (king.colIdx === tile.colIdx) {
            // Checking for the same column
            const idxOftileToRemove = availableTiles.findIndex(
              (tile) => tile?.colIdx === king?.colIdx
            );
            availableTiles[idxOftileToRemove] = null;
          } else if (
            Math.abs(king.rowIdx - tile.rowIdx) ===
            Math.abs(king.colIdx - tile.colIdx)
          ) {
            // Checking for the same diagonal
            const directionRow = Math.sign(king.rowIdx - tile.rowIdx);
            const directionCol = Math.sign(king.colIdx - tile.colIdx);
            let currentRow = tile.rowIdx + directionRow;
            let currentCol = tile.colIdx + directionCol;

            while (
              currentRow >= 0 &&
              currentRow < 8 &&
              currentCol >= 0 &&
              currentCol < 8
            ) {
              const idxOftileToRemove = availableTiles.findIndex(
                (t) => t?.rowIdx === currentRow && t?.colIdx === currentCol
              );

              if (idxOftileToRemove !== -1) {
                availableTiles[idxOftileToRemove] = null;
              }

              currentRow += directionRow;
              currentCol += directionCol;
            }
          }
        }
        // // Rook
        if (
          tile.name === FIGURE_NAMES.ROOK &&
          isKingUnderAttack(king, availableTilesForEnemyFigure)
        ) {
          if (king.rowIdx === tile.rowIdx) {
            // Chcking for the same row
            const idxOftileToRemove = availableTiles.findIndex(
              (tile) => tile?.rowIdx === king?.rowIdx
            );
            availableTiles[idxOftileToRemove] = null;
          } else if (king.colIdx === tile.colIdx) {
            // Checking for the same column
            const idxOftileToRemove = availableTiles.findIndex(
              (tile) => tile?.colIdx === king?.colIdx
            );
            availableTiles[idxOftileToRemove] = null;
          }
        }
        // Bishop
        if (
          tile.name === FIGURE_NAMES.BISHOP &&
          isKingUnderAttack(king, availableTilesForEnemyFigure)
        ) {
          if (
            Math.abs(king.rowIdx - tile.rowIdx) ===
            Math.abs(king.colIdx - tile.colIdx)
          ) {
            // Checking for the same diagonal
            const directionRow = Math.sign(king.rowIdx - tile.rowIdx);
            const directionCol = Math.sign(king.colIdx - tile.colIdx);
            let currentRow = tile.rowIdx + directionRow;
            let currentCol = tile.colIdx + directionCol;

            while (
              currentRow >= 0 &&
              currentRow < 8 &&
              currentCol >= 0 &&
              currentCol < 8
            ) {
              const idxOftileToRemove = availableTiles.findIndex(
                (t) => t?.rowIdx === currentRow && t?.colIdx === currentCol
              );

              if (idxOftileToRemove !== -1) {
                availableTiles[idxOftileToRemove] = null;
              }

              currentRow += directionRow;
              currentCol += directionCol;
            }
          }
        }
        // Pawn
        if (tile.name === FIGURE_NAMES.PAWN) {
          // Define enemy's pawn
          const availableTilesForPawn: ITile[] = [];

          if (tile.color === COLORS.WHITE) {
            let rowIdx = 0;

            if (tile.rowIdx - 1 >= 0) {
              rowIdx = tile.rowIdx - 1;

              // Checking topLeft
              if (tile.colIdx - 1 >= 0) {
                if (tiles[rowIdx] && tiles[rowIdx][tile.colIdx - 1]) {
                  availableTilesForPawn.push(tiles[rowIdx][tile.colIdx - 1]);
                }
              }

              // Checking topRight
              if (tile.colIdx + 1 <= 7) {
                if (tiles[rowIdx] && tiles[rowIdx][tile.colIdx + 1]) {
                  availableTilesForPawn.push(tiles[rowIdx][tile.colIdx + 1]);
                }
              }
            }
          }

          if (tile.color === COLORS.BLACK) {
            let rowIdx = 0;

            if (tile.rowIdx + 1 <= 7) {
              rowIdx = tile.rowIdx + 1;

              // Checking bottomLeft
              if (tile.colIdx - 1 >= 0) {
                if (tiles[rowIdx] && tiles[rowIdx][tile.colIdx - 1]) {
                  availableTilesForPawn.push(tiles[rowIdx][tile.colIdx - 1]);
                }
              }

              // Checking bottomRight
              if (tile.colIdx + 1 <= 7) {
                if (tiles[rowIdx] && tiles[rowIdx][tile.colIdx + 1]) {
                  availableTilesForPawn.push(tiles[rowIdx][tile.colIdx + 1]);
                }
              }
            }
          }

          for (const availableTileForPawn of availableTilesForPawn) {
            const idx = availableTiles.findIndex(
              (tile) =>
                tile?.rowIdx === availableTileForPawn.rowIdx &&
                tile?.colIdx === availableTileForPawn.colIdx
            );

            if (idx !== -1) {
              availableTiles[idx] = null;
            }
          }
        }
      }
    }
  }

  return availableTiles.filter(Boolean) as ITile[];
};
