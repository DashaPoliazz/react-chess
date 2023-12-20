import { FIGURE_NAMES, ITile } from "../types";
import { findFigure } from "./findFigure";
import { isKingInCheck } from "./isKingInCheck";

export const isCheckAfterTurn = (tiles: ITile[][], from: ITile, to: ITile) => {
  const copiedBoard = copyBoard(tiles);

  // Moving figure
  copiedBoard[to.rowIdx][to.colIdx] = {
    ...copiedBoard[to.rowIdx][to.colIdx],
    name: from.name,
    id: from.id,
    isFirstTurn: false,
    color: from.color,
  };
  copiedBoard[from.rowIdx][from.colIdx] = {
    rowIdx: from.rowIdx,
    colIdx: from.colIdx,
  };

  // If check comes after it then we can't do this turn
  const king = findFigure(FIGURE_NAMES.KING, from.color!, copiedBoard);
  const [isCheck] = isKingInCheck(king!, copiedBoard);

  return isCheck;
};

const copyBoard = (board: ITile[][]) => {
  const newBoard = [];

  for (const row of board) {
    newBoard.push(row.slice());
  }

  return newBoard;
};
