import { Figure } from "../figures/Figure";

export class Tile {
  rowIdx: number;
  colIdx: number;
  figure: Figure | null = null;
  isAvailable: boolean = false;
  key: string = "";

  constructor(rowIdx: number, colIdx: number) {
    this.rowIdx = rowIdx;
    this.colIdx = colIdx;
    this.key = `r${rowIdx}c${colIdx}`;
  }

  public toggleAvailable(): void {
    this.isAvailable = !this.isAvailable;
  }
}
