import { COLORS, FIGURE_NAMES, ITile } from "../types";

export const findFigure = (
  figureName: FIGURE_NAMES,
  color: COLORS,
  tiles: ITile[][]
): ITile | undefined => {
  let needle = undefined;

  for (let i = 0; i < 8; i++) {
    const tile = tiles[i].find(
      (tile) => tile.name === figureName && color === tile.color
    );

    if (tile) needle = tile;
  }

  return needle;
};
