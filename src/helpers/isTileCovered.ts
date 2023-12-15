import { COLORS, FIGURE_NAMES, ITile } from "../types";

export const isTileCovered = (
  tile: ITile,
  tileToCover: ITile,
  tiles: ITile[][]
): boolean => {
  if (!tile.name) return false;

  switch (tile.name) {
    case FIGURE_NAMES.PAWN:
      return getAvailableTilesForPawn(tile, tileToCover, tiles);
    case FIGURE_NAMES.ROOK:
      return getAvailableTilesForRook(tile, tileToCover, tiles);
    case FIGURE_NAMES.KNIGHT:
      return getAvailableTilesForKnight(tile, tileToCover, tiles);
    case FIGURE_NAMES.BISHOP:
      return getAvailableTilesForBishop(tile, tileToCover, tiles);
    case FIGURE_NAMES.QUEEN:
      return getAvailableTilesForQueen(tile, tileToCover, tiles);
    case FIGURE_NAMES.KING:
      return getAvailableTilesForKing(tile, tileToCover, tiles);

    default:
      break;
  }

  return false;
};

const getAvailableTilesForPawn = (
  tile: ITile,
  tileToCover: ITile,
  tiles: ITile[][]
): boolean => {
  const { color, rowIdx, colIdx } = tile;

  // White
  if (color === COLORS.WHITE) {
    if (rowIdx - 1 < 0) {
      return false;
    }

    // Diagonal tiles
    const topLeft = tiles[rowIdx - 1][colIdx - 1];
    const topRight = tiles[rowIdx - 1][colIdx + 1];

    if (
      topLeft &&
      topLeft.rowIdx === tileToCover.rowIdx &&
      topRight.colIdx === tileToCover.colIdx
    ) {
      return true;
    }
    if (
      topRight &&
      topRight.rowIdx === tileToCover.rowIdx &&
      topRight.colIdx === tileToCover.colIdx
    ) {
      return true;
    }
  }
  // Black
  if (color === COLORS.BLACK) {
    if (rowIdx + 1 >= 8) {
      return false;
    }
    // Diagonal tiles
    const topLeft = tiles[rowIdx + 1][colIdx - 1];
    const topRight = tiles[rowIdx + 1][colIdx + 1];

    if (
      topLeft &&
      topLeft.rowIdx === tileToCover.rowIdx &&
      topRight.colIdx === tileToCover.colIdx
    ) {
      return true;
    }
    if (
      topRight &&
      topRight.rowIdx === tileToCover.rowIdx &&
      topRight.colIdx === tileToCover.colIdx
    ) {
      return true;
    }
  }

  return false;
};

const getAvailableTilesForRook = (
  tile: ITile,
  tileToCover: ITile,
  tiles: ITile[][]
): boolean => {
  const { rowIdx, colIdx } = tile;

  // Up traverse
  return (
    traverseDirection(tiles, rowIdx, colIdx, -1, 0, tileToCover) ||
    // Right traverse
    traverseDirection(tiles, rowIdx, colIdx, 0, 1, tileToCover) ||
    // Down traverse
    traverseDirection(tiles, rowIdx, colIdx, 1, 0, tileToCover) ||
    // Left traverse
    traverseDirection(tiles, rowIdx, colIdx, 0, -1, tileToCover)
  );
};

const getAvailableTilesForKnight = (
  tile: ITile,
  tileToCover: ITile,
  tiles: ITile[][]
): boolean => {
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
      if (newRow === tileToCover.rowIdx && newCol === tileToCover.colIdx) {
        return true;
      }
    }
  }

  return false;
};

const getAvailableTilesForBishop = (
  tile: ITile,
  tileToCover: ITile,
  tiles: ITile[][]
): boolean => {
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
        if (
          currentTile.rowIdx === tileToCover.rowIdx &&
          currentTile.colIdx === tileToCover.colIdx
        ) {
          return true;
        } else {
          return false;
        }
      }

      rowIdx += direction.rowDelta;
      colIdx += direction.colDelta;
    }
  }

  return false;
};

const traverseDirection = (
  tiles: ITile[][],
  startRow: number,
  startCol: number,
  rowIncrement: number,
  colIncrement: number,
  tileToCover: ITile
): boolean => {
  let rowIdx = startRow + rowIncrement;
  let colIdx = startCol + colIncrement;

  while (rowIdx >= 0 && rowIdx < 8 && colIdx >= 0 && colIdx < 8) {
    if (tiles[rowIdx][colIdx].name) {
      if (rowIdx === tileToCover.rowIdx && colIdx === tileToCover.colIdx) {
        return true;
      } else {
        return false;
      }
    }

    rowIdx += rowIncrement;
    colIdx += colIncrement;
  }

  return false;
};

const getAvailableTilesForQueen = (
  tile: ITile,
  tileToCover: ITile,
  tiles: ITile[][]
): boolean => {
  const bishopTiles = getAvailableTilesForBishop(tile, tileToCover, tiles);
  const rookTiles = getAvailableTilesForRook(tile, tileToCover, tiles);

  return bishopTiles || rookTiles;
};

const getAvailableTilesForKing = (
  tile: ITile,
  tileToCover: ITile,
  tiles: ITile[][]
): boolean => {
  const { rowIdx, colIdx, color } = tile;

  const canCover = (row: number, col: number) => {
    if (row >= 0 && row <= 7 && col >= 0 && col <= 7) {
      const targetTile = tiles[row][col];
      if (
        targetTile.name &&
        targetTile.rowIdx === tileToCover.rowIdx &&
        targetTile.colIdx === tileToCover.colIdx
      ) {
        return true;
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

    if (canCover(newRow, newCol)) {
      return true;
    }
  }

  return false;
};

const isValidTile = (row: number, col: number): boolean => {
  return row >= 0 && row < 8 && col >= 0 && col < 8;
};
