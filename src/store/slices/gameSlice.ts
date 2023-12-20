import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { COLORS, ITile } from "../../types";
import { tiles } from "../../helpers/board";

interface IState {
  winner: COLORS | null;
  selectedTile: ITile | null;
  tiles: ITile[][];
  side: COLORS;
}

const initialState: IState = {
  winner: null,
  selectedTile: null,
  tiles: tiles,
  side: COLORS.WHITE,
};

export const gameSlice = createSlice({
  name: "GameSlice",
  initialState,
  reducers: {
    setSelectedTile: (state, action: PayloadAction<ITile | null>) => {
      state.selectedTile = action.payload;
    },
    setWinner: (state, action: PayloadAction<COLORS>) => {
      state.winner = action.payload;
    },
    setSide: (state, action: PayloadAction<COLORS>) => {
      state.side = action.payload;
    },
    moveFigure: (
      state,
      action: PayloadAction<{
        from: ITile;
        to: ITile;
      }>
    ) => {
      const { from, to } = action.payload;

      // TODO: check for opponent's figure

      // Setting figure to new tile
      state.tiles[to.rowIdx][to.colIdx] = {
        ...state.tiles[to.rowIdx][to.colIdx],
        name: from.name,
        id: from.id,
        isFirstTurn: false,
        color: from.color,
      };
      // Removing figure from prev tiles
      state.tiles[from.rowIdx][from.colIdx] = {
        rowIdx: from.rowIdx,
        colIdx: from.colIdx,
      };

      state.selectedTile = null;
    },
  },
});

export const gameActions = gameSlice.actions;
export const gameReducer = gameSlice.reducer;
