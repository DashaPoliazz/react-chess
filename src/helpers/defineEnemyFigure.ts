import { COLORS } from "../types";

export const defineEnemyColor = (currentColor: COLORS) =>
  currentColor === COLORS.WHITE ? COLORS.BLACK : COLORS.WHITE;
