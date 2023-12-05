import "./tile.css";
import classNames from "classnames";
import { COLORS, FIGURE_NAMES, ITile } from "../../types";
import { Figure } from "../Figure/Figure";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useActions } from "../../hooks/useActions";
import { useState, useEffect } from "react";

type Props = {
  tile: ITile;
  setAvailableTiles: (tiles: ITile[]) => void;
  isHighlighted: boolean;
  hoveredTile: ITile | null;
  whoseTurn: COLORS;
  setWhoseTurn: (side: COLORS) => void;
};

export const Tile = ({
  tile,
  setAvailableTiles,
  isHighlighted,
  hoveredTile,
  whoseTurn,
  setWhoseTurn,
}: Props) => {
  // Redux
  const { selectedTile, tiles } = useAppSelector((state) => state.game);
  const { setSelectedTile, moveFigure } = useActions();

  // Handlers
  const handleTileClick = (e: React.MouseEvent<HTMLDivElement>) => {
    setSelectedTile(tile);

    const availableTiles = getAvailableTiles(tiles, tile);
    setAvailableTiles(availableTiles);

    if (
      hoveredTile &&
      selectedTile &&
      isHighlighted &&
      whoseTurn === selectedTile.color
    ) {
      moveFigure({
        from: selectedTile,
        to: hoveredTile,
      });
      setAvailableTiles([]);
      setWhoseTurn(whoseTurn === COLORS.WHITE ? COLORS.BLACK : COLORS.WHITE);
    }
  };

  const getAvailableTiles = (tiles: ITile[][], tile: ITile): ITile[] => {
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

  const getAvailableTilesForKnight = (
    tile: ITile,
    tiles: ITile[][]
  ): ITile[] => {
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

  const getAvailableTilesForBishop = (
    tile: ITile,
    tiles: ITile[][]
  ): ITile[] => {
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

  const getAvailableTilesForQueen = (
    tile: ITile,
    tiles: ITile[][]
  ): ITile[] => {
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
        if (!targetTile.name || targetTile.color !== color) {
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

  return (
    <div
      className={classNames("board__tile", "tile", {
        "tile--black":
          (tile && tile.rowIdx % 2 === 0 && tile?.colIdx % 2 === 0) ||
          (tile && tile.rowIdx % 2 === 1 && tile.colIdx % 2 === 1),
        "tile--white":
          (tile && tile.rowIdx % 2 === 0 && tile.colIdx % 2 === 1) ||
          (tile && tile.rowIdx % 2 === 1 && tile.colIdx % 2 === 0),
        "tile--selected": selectedTile === tile && selectedTile.name,
      })}
      onClick={handleTileClick}
      data-index={`${tile.rowIdx}-${tile.colIdx}`}
    >
      {tile.name && tile.color && (
        <Figure figure={tile.name} color={tile.color} />
      )}
      {isHighlighted && <div className="tile__highlighted"></div>}
    </div>
  );
};
