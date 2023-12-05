import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITile } from "../../types";
import { tiles } from "../../helpers/board";

interface IState {
  selectedTile: ITile | null;
  tiles: ITile[][];
}

const initialState: IState = {
  selectedTile: null,
  tiles: tiles,
};

export const gameSlice = createSlice({
  name: "GameSlice",
  initialState,
  reducers: {
    setSelectedTile: (state, action: PayloadAction<ITile | null>) => {
      state.selectedTile = action.payload;
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
