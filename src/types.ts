export enum COLORS {
  BLACK = "BLACK",
  WHITE = "WHITE",
}

export enum FIGURE_NAMES {
  PAWN = "PAWN",
  ROOK = "ROOK",
  KNIGHT = "KNIGHT",
  BISHOP = "BISHOP",
  QUEEN = "QUEEN",
  KING = "KING",
}

export interface ITile {
  id?: string;
  name?: FIGURE_NAMES;
  color?: COLORS;
  rowIdx: number;
  colIdx: number;
  isFirstTurn?: boolean;
}
