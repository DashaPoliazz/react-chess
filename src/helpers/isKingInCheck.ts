import { COLORS, FIGURE_NAMES, ITile } from "../types";
import { getAvailableTiles } from "./getAvailableTiles";

export const isKingInCheck = (
  kingTile: ITile,
  tiles: ITile[][]
): [boolean, ITile] => {
  const oppositeColor =
    kingTile.color === COLORS.WHITE ? COLORS.BLACK : COLORS.WHITE;
  const oppositeFigures = getAllFiguresOfColor(tiles, oppositeColor);

  for (const figure of oppositeFigures) {
    const availableMoves = getAvailableTiles(tiles, figure);

    for (const move of availableMoves) {
      if (move.name === FIGURE_NAMES.KING && move.color === kingTile.color) {
        return [true, figure];
      }
    }
  }

  return [false, {} as ITile];
};

const getAllFiguresOfColor = (tiles: ITile[][], color: COLORS): ITile[] => {
  const figures = [];

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const tile = tiles[row][col];
      if (tile.color === color) {
        figures.push(tile);
      }
    }
  }

  return figures;
};
