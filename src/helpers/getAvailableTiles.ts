import { COLORS, FIGURE_NAMES, ITile } from "../types";
import { isTileCovered } from "./isTileCovered";

export const getAvailableTiles = (tiles: ITile[][], tile: ITile): ITile[] => {
  const availableTiles: ITile[] = [];

  if (!tile.name) return availableTiles;

  switch (tile.name) {
    case FIGURE_NAMES.PAWN:
      return getAvailableTilesForPawn(tile, tiles);
    case FIGURE_NAMES.ROOK:
      return getAvailableTilesForRook(tile, tiles);
    case FIGURE_NAMES.KNIGHT:
      return getAvailableTilesForKnight(tile, tiles);
    case FIGURE_NAMES.BISHOP:
      return getAvailableTilesForBishop(tile, tiles);
    case FIGURE_NAMES.QUEEN:
      return getAvailableTilesForQueen(tile, tiles);
    case FIGURE_NAMES.KING:
      return getAvailableTilesForKing(tile, tiles);

    default:
      break;
  }

  return availableTiles;
};

const getAvailableTilesForPawn = (tile: ITile, tiles: ITile[][]): ITile[] => {
  const availableTiles: ITile[] = [];
  const { color, rowIdx, colIdx, isFirstTurn } = tile;

  // White
  if (color === COLORS.WHITE) {
    if (rowIdx - 1 < 0) {
      return availableTiles;
    }

    const top = tiles[rowIdx - 1][colIdx];

    // Top two tiles
    if (isFirstTurn) {
      const topTop = tiles[rowIdx - 2][colIdx];

      if (top && !top.name) {
        availableTiles.push(top);
      }
      if (topTop && !topTop.name) {
        availableTiles.push(topTop);
      }
    } else {
      if (top && !top.name) {
        availableTiles.push(top);
      }
    }

    // Diagonal tiles
    const topLeft = tiles[rowIdx - 1][colIdx - 1];
    const topRight = tiles[rowIdx - 1][colIdx + 1];

    if (topLeft && topLeft.color && topLeft.color !== tile.color) {
      availableTiles.push(topLeft);
    }
    if (topRight && topRight.color && topRight.color !== tile.color) {
      availableTiles.push(topRight);
    }
  }
  // Black
  if (color === COLORS.BLACK) {
    if (rowIdx + 1 >= 8) {
      return availableTiles;
    }
    const top = tiles[rowIdx + 1][colIdx];

    // Top two tiles
    if (tile.isFirstTurn) {
      const topTop = tiles[rowIdx + 2][colIdx];

      if (top && !top.name) {
        availableTiles.push(top);
      }
      if (topTop && !topTop.name) {
        availableTiles.push(topTop);
      }
    } else {
      if (top && !top.name) {
        availableTiles.push(top);
      }
    }

    // Diagonal tiles
    const topLeft = tiles[rowIdx + 1][colIdx - 1];
    const topRight = tiles[rowIdx + 1][colIdx + 1];

    if (topLeft && topLeft.color && topLeft.color !== tile.color) {
      availableTiles.push(topLeft);
    }
    if (topRight && topRight.color && topRight.color !== tile.color) {
      availableTiles.push(topRight);
    }
  }
  return availableTiles;
};

const getAvailableTilesForRook = (tile: ITile, tiles: ITile[][]): ITile[] => {
  const { rowIdx, colIdx } = tile;
  const availableTiles: ITile[] = [];

  // Up traverse
  availableTiles.push(...traverseDirection(tiles, rowIdx, colIdx, -1, 0));
  // Right traverse
  availableTiles.push(...traverseDirection(tiles, rowIdx, colIdx, 0, 1));
  // Down traverse
  availableTiles.push(...traverseDirection(tiles, rowIdx, colIdx, 1, 0));
  // Left traverse
  availableTiles.push(...traverseDirection(tiles, rowIdx, colIdx, 0, -1));

  return availableTiles;
};

const getAvailableTilesForKnight = (tile: ITile, tiles: ITile[][]): ITile[] => {
  const availableTiles: ITile[] = [];

  const possibleMoves = [
    { row: -2, col: -1 },
    { row: -2, col: 1 },
    { row: 2, col: -1 },
    { row: 2, col: 1 },
    { row: -1, col: -2 },
    { row: -1, col: 2 },
    { row: 1, col: -2 },
    { row: 1, col: 2 },
  ];

  for (const move of possibleMoves) {
    const newRow = tile.rowIdx + move.row;
    const newCol = tile.colIdx + move.col;

    if (isValidTile(newRow, newCol)) {
      const newTile = tiles[newRow][newCol];

      if (tiles[newRow][newCol].name) {
        if (tiles[newRow][newCol].color !== tile.color) {
          availableTiles.push(newTile);
        }
      } else {
        availableTiles.push(newTile);
      }
    }
  }

  return availableTiles;
};

const getAvailableTilesForBishop = (tile: ITile, tiles: ITile[][]): ITile[] => {
  const availableTiles: ITile[] = [];
  const directions = [
    { rowDelta: -1, colDelta: -1 },
    { rowDelta: -1, colDelta: 1 },
    { rowDelta: 1, colDelta: 1 },
    { rowDelta: 1, colDelta: -1 },
  ];

  for (const direction of directions) {
    let rowIdx = tile.rowIdx + direction.rowDelta;
    let colIdx = tile.colIdx + direction.colDelta;

    while (isValidTile(rowIdx, colIdx)) {
      const currentTile = tiles[rowIdx][colIdx];

      if (currentTile.name) {
        if (currentTile.color !== tile.color) {
          availableTiles.push(currentTile);
        }

        break;
      } else {
        availableTiles.push(currentTile);
      }

      rowIdx += direction.rowDelta;
      colIdx += direction.colDelta;
    }
  }

  return availableTiles;
};

const traverseDirection = (
  tiles: ITile[][],
  startRow: number,
  startCol: number,
  rowIncrement: number,
  colIncrement: number
): ITile[] => {
  const availableTiles: ITile[] = [];
  let rowIdx = startRow + rowIncrement;
  let colIdx = startCol + colIncrement;

  while (rowIdx >= 0 && rowIdx < 8 && colIdx >= 0 && colIdx < 8) {
    if (tiles[rowIdx][colIdx].name) {
      if (tiles[rowIdx][colIdx].color !== tiles[startRow][startCol].color) {
        availableTiles.push(tiles[rowIdx][colIdx]);
      }
      break;
    } else {
      availableTiles.push(tiles[rowIdx][colIdx]);
    }

    rowIdx += rowIncrement;
    colIdx += colIncrement;
  }

  return availableTiles;
};

const getAvailableTilesForQueen = (tile: ITile, tiles: ITile[][]): ITile[] => {
  const bishopTiles = getAvailableTilesForBishop(tile, tiles);
  const rookTiles = getAvailableTilesForRook(tile, tiles);

  return rookTiles.concat(bishopTiles);
};

const getAvailableTilesForKing = (tile: ITile, tiles: ITile[][]): ITile[] => {
  const availableTiles: ITile[] = [];
  const { rowIdx, colIdx, color } = tile;

  const addTileIfValid = (row: number, col: number) => {
    if (row >= 0 && row <= 7 && col >= 0 && col <= 7) {
      const targetTile = tiles[row][col];
      // Problem is here
      const isCovered = isTileCovered(tile, targetTile, tiles);

      if (targetTile.name && targetTile.color !== color && !isCovered) {
        availableTiles.push(targetTile);
      }
      if (targetTile.name && targetTile.color !== color) {
        availableTiles.push(targetTile);
      }
      if (!targetTile.name) {
        availableTiles.push(targetTile);
      }
    }
  };

  const directions = [
    { row: -1, col: 0 },
    { row: -1, col: -1 },
    { row: -1, col: 1 },
    { row: 0, col: 1 },
    { row: 1, col: 1 },
    { row: 1, col: 0 },
    { row: 1, col: -1 },
    { row: 0, col: -1 },
  ];

  for (const dir of directions) {
    const newRow = rowIdx + dir.row;
    const newCol = colIdx + dir.col;
    addTileIfValid(newRow, newCol);
  }

  return availableTiles;
};

const isValidTile = (row: number, col: number): boolean => {
  return row >= 0 && row < 8 && col >= 0 && col < 8;
};

export const validateAvailableTilesForKing = (
  availableTilesForKing: ITile[],
  king: ITile,
  tiles: ITile[][]
) => {
  const copy: (ITile | null)[] = [...availableTilesForKing];

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const tile = tiles[row][col];

      if (king.color !== tile.color) {
        let unavailableTiles: ITile[] = [];

        if (tile.name === FIGURE_NAMES.PAWN) {
          if (tile.color === COLORS.WHITE) {
            let rowIdx = 0;

            if (tile.rowIdx - 1 >= 0) {
              rowIdx = tile.rowIdx - 1;
              if (tile.colIdx - 1 >= 0) {
                unavailableTiles.push(tiles[rowIdx][tile.colIdx - 1]);
              }
              if (tile.colIdx + 1 <= 7) {
                unavailableTiles.push(tiles[rowIdx][tile.colIdx + 1]);
              }
            }
          }

          if (tile.color === COLORS.BLACK) {
            let rowIdx = 0;

            if (tile.rowIdx + 1 <= 7) {
              rowIdx = tile.rowIdx + 1;
              if (tile.colIdx - 1 >= 0) {
                unavailableTiles.push(tiles[rowIdx][tile.colIdx - 1]);
              }
              if (tile.colIdx + 1 <= 7) {
                unavailableTiles.push(tiles[rowIdx][tile.colIdx + 1]);
              }
            }
          }
        } else {
          unavailableTiles = unavailableTiles.concat(
            getAvailableTiles(tiles, tile)
          );
        }

        for (const unavailableTile of unavailableTiles) {
          const idxToRemove = copy.findIndex(
            (t) =>
              t?.rowIdx === unavailableTile.rowIdx &&
              t?.colIdx === unavailableTile.colIdx
          );

          if (idxToRemove !== -1) {
            copy[idxToRemove] = null;
          }
        }
      }
    }
  }

  return copy.filter(Boolean) as ITile[];
};
