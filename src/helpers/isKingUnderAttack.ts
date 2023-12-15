import { ITile } from "../types";

export const isKingUnderAttack = (
  kingTile: ITile,
  availableTilesForFigure: ITile[]
) => {
  const idxOfTile = availableTilesForFigure.findIndex(
    (tile) => tile.rowIdx === kingTile.rowIdx && tile.colIdx === kingTile.colIdx
  );

  return idxOfTile !== -1;
};
