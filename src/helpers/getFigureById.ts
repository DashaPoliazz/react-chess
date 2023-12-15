import { ITile } from "../types";

export const getFigureById = (
  id: string,
  tiles: ITile[][]
): ITile | undefined => {
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const tile = tiles[row][col];

      if (tile.id === id) {
        return tile;
      }
    }
  }
};
