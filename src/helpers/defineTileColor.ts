import { Colors } from "../models/figures/Figure";

export const defineTileColor = (rowIdx: number, colIdx: number): Colors => {
  if (rowIdx % 2 === 0) {
    if (colIdx % 2 === 0) {
      return Colors.BLACK;
    } else {
      return Colors.WHITE;
    }
  } else {
    if (colIdx % 2 === 0) {
      return Colors.WHITE;
    } else {
      return Colors.BLACK;
    }
  }
};
