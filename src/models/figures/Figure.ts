import { Tile } from "../Tile/Tile";
import FigureImage from "../../assets/figures/black/bb.svg";

export enum Colors {
  WHITE = "white",
  BLACK = "black",
}

export enum ChessFigures {
  Pawn = "pawn",
  Knight = "knight",
  Bishop = "bishop",
  Rook = "rook",
  Queen = "queen",
  King = "king",
}

export class Figure {
  public tile: Tile | null;
  public color: Colors;
  public figureImage: typeof FigureImage;
  public figureName: ChessFigures;

  constructor(
    tile: Tile,
    color: Colors,
    figureImage: typeof FigureImage,
    figureName: ChessFigures
  ) {
    this.tile = tile;
    this.color = color;
    tile.figure = this;
    this.figureImage = figureImage;
    this.figureName = figureName;
  }

  move(newTile: Tile): boolean {
    // Can't move on the his figures
    if (newTile.figure?.color === this.color) {
      return false;
    }
    // Can't move on the enemy's king
    if (newTile.figure?.figureName === ChessFigures.King) {
      return false;
    }

    return true;
  }
}
