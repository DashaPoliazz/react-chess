import { COLORS, FIGURE_NAMES, ITile } from "../types";

const figures: Record<string, ITile> = {
  // White figures
  "7-0": {
    id: "white-rook-7-0",
    name: FIGURE_NAMES.ROOK,
    color: COLORS.WHITE,
    rowIdx: 7,
    colIdx: 0,
  },
  "7-7": {
    id: "white-rook-7-7",
    name: FIGURE_NAMES.ROOK,
    color: COLORS.WHITE,
    rowIdx: 7,
    colIdx: 7,
  },
  "7-1": {
    id: "white-knight-7-1",
    name: FIGURE_NAMES.KNIGHT,
    color: COLORS.WHITE,
    rowIdx: 7,
    colIdx: 1,
  },
  "7-6": {
    id: "white-knight-7-6",
    name: FIGURE_NAMES.KNIGHT,
    color: COLORS.WHITE,
    rowIdx: 7,
    colIdx: 6,
  },
  "7-2": {
    id: "white-bishop-7-2",
    name: FIGURE_NAMES.BISHOP,
    color: COLORS.WHITE,
    rowIdx: 7,
    colIdx: 2,
  },
  "7-5": {
    id: "white-bishop-7-5",
    name: FIGURE_NAMES.BISHOP,
    color: COLORS.WHITE,
    rowIdx: 7,
    colIdx: 5,
  },
  "7-3": {
    id: "white-queen-7-3",
    name: FIGURE_NAMES.QUEEN,
    color: COLORS.WHITE,
    rowIdx: 7,
    colIdx: 3,
  },
  "7-4": {
    id: "white-king-7-4",
    name: FIGURE_NAMES.KING,
    color: COLORS.WHITE,
    rowIdx: 7,
    colIdx: 4,
  },
  "6-0": {
    id: "white-pawn-6-0",
    name: FIGURE_NAMES.PAWN,
    color: COLORS.WHITE,
    rowIdx: 6,
    colIdx: 0,
    isFirstTurn: true,
  },
  "6-1": {
    id: "white-pawn-6-1",
    name: FIGURE_NAMES.PAWN,
    color: COLORS.WHITE,
    rowIdx: 6,
    colIdx: 1,
    isFirstTurn: true,
  },
  "6-2": {
    id: "white-pawn-6-2",
    name: FIGURE_NAMES.PAWN,
    color: COLORS.WHITE,
    rowIdx: 6,
    colIdx: 2,
    isFirstTurn: true,
  },
  "6-3": {
    id: "white-pawn-6-3",
    name: FIGURE_NAMES.PAWN,
    color: COLORS.WHITE,
    rowIdx: 6,
    colIdx: 3,
    isFirstTurn: true,
  },
  "6-4": {
    id: "white-pawn-6-4",
    name: FIGURE_NAMES.PAWN,
    color: COLORS.WHITE,
    rowIdx: 6,
    colIdx: 4,
    isFirstTurn: true,
  },
  "6-5": {
    id: "white-pawn-6-5",
    name: FIGURE_NAMES.PAWN,
    color: COLORS.WHITE,
    rowIdx: 6,
    colIdx: 5,
    isFirstTurn: true,
  },
  "6-6": {
    id: "white-pawn-6-6",
    name: FIGURE_NAMES.PAWN,
    color: COLORS.WHITE,
    rowIdx: 6,
    colIdx: 6,
    isFirstTurn: true,
  },
  "6-7": {
    id: "white-pawn-6-7",
    name: FIGURE_NAMES.PAWN,
    color: COLORS.WHITE,
    rowIdx: 6,
    colIdx: 7,
    isFirstTurn: true,
  },
  // Black figures
  "0-0": {
    id: "black-rook-0-0",
    name: FIGURE_NAMES.ROOK,
    color: COLORS.BLACK,
    rowIdx: 0,
    colIdx: 0,
  },
  "0-7": {
    id: "black-rook-0-7",
    name: FIGURE_NAMES.ROOK,
    color: COLORS.BLACK,
    rowIdx: 0,
    colIdx: 7,
  },
  "0-1": {
    id: "black-knight-0-1",
    name: FIGURE_NAMES.KNIGHT,
    color: COLORS.BLACK,
    rowIdx: 0,
    colIdx: 1,
  },
  "0-6": {
    id: "black-knight-0-6",
    name: FIGURE_NAMES.KNIGHT,
    color: COLORS.BLACK,
    rowIdx: 0,
    colIdx: 6,
  },
  "0-2": {
    id: "black-bishop-0-2",
    name: FIGURE_NAMES.BISHOP,
    color: COLORS.BLACK,
    rowIdx: 0,
    colIdx: 2,
  },
  "0-5": {
    id: "black-bishop-0-5",
    name: FIGURE_NAMES.BISHOP,
    color: COLORS.BLACK,
    rowIdx: 0,
    colIdx: 5,
  },
  "0-3": {
    id: "black-queen-0-3",
    name: FIGURE_NAMES.QUEEN,
    color: COLORS.BLACK,
    rowIdx: 0,
    colIdx: 3,
  },
  "0-4": {
    id: "black-king-0-4",
    name: FIGURE_NAMES.KING,
    color: COLORS.BLACK,
    rowIdx: 0,
    colIdx: 4,
  },
  "1-0": {
    id: "black-pawn-1-0",
    name: FIGURE_NAMES.PAWN,
    color: COLORS.BLACK,
    rowIdx: 1,
    colIdx: 0,
    isFirstTurn: true,
  },
  "1-1": {
    id: "black-pawn-1-1",
    name: FIGURE_NAMES.PAWN,
    color: COLORS.BLACK,
    rowIdx: 1,
    colIdx: 1,
    isFirstTurn: true,
  },
  "1-2": {
    id: "black-pawn-1-2",
    name: FIGURE_NAMES.PAWN,
    color: COLORS.BLACK,
    rowIdx: 1,
    colIdx: 2,
    isFirstTurn: true,
  },
  "1-3": {
    id: "black-pawn-1-3",
    name: FIGURE_NAMES.PAWN,
    color: COLORS.BLACK,
    rowIdx: 1,
    colIdx: 3,
    isFirstTurn: true,
  },
  "1-4": {
    id: "black-pawn-1-4",
    name: FIGURE_NAMES.PAWN,
    color: COLORS.BLACK,
    rowIdx: 1,
    colIdx: 4,
    isFirstTurn: true,
  },
  "1-5": {
    id: "black-pawn-1-5",
    name: FIGURE_NAMES.PAWN,
    color: COLORS.BLACK,
    rowIdx: 1,
    colIdx: 5,
    isFirstTurn: true,
  },
  "1-6": {
    id: "black-pawn-1-6",
    name: FIGURE_NAMES.PAWN,
    color: COLORS.BLACK,
    rowIdx: 1,
    colIdx: 6,
    isFirstTurn: true,
  },
  "1-7": {
    id: "black-pawn-1-7",
    name: FIGURE_NAMES.PAWN,
    color: COLORS.BLACK,
    rowIdx: 1,
    colIdx: 7,
    isFirstTurn: true,
  },
};

const getKey = (rowIdx: number, colIdx: number): string => {
  return `${rowIdx}-${colIdx}`;
};

const getFigure = (rowIdx: number, colIdx: number): ITile => {
  const key = getKey(rowIdx, colIdx);

  return figures[key] || { rowIdx, colIdx };
};

export const generateTiles = (): ITile[][] => {
  const tiles: ITile[][] = [];

  for (let rowIdx = 0; rowIdx < 8; rowIdx++) {
    const row: ITile[] = [];

    for (let colIdx = 0; colIdx < 8; colIdx++) {
      const figure = getFigure(rowIdx, colIdx);

      row.push(figure);
    }

    tiles.push(row);
  }

  return tiles;
};

export const generateTilesAsync = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const tiles = [];

      for (let rowIdx = 0; rowIdx < 8; rowIdx++) {
        const row = [];

        for (let colIdx = 0; colIdx < 8; colIdx++) {
          const figure = getFigure(rowIdx, colIdx);
          row.push(figure);
        }

        tiles.push(row);
      }

      resolve(tiles);
    }, 0);
  });
};

export const tiles = generateTiles();
