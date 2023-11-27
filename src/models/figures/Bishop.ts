import WhiteBishop from "../../assets/figures/white/wb.svg";
import BlackBishop from "../../assets/figures/black/bb.svg";
import { ChessFigures, Colors, Figure } from "./Figure";
import { Tile } from "../Tile/Tile";
import { Board } from "../board/Board";
import { King } from "./King";

export class Bishop extends Figure {
  constructor(tile: Tile, color: Colors) {
    const bishopImage = color === Colors.WHITE ? WhiteBishop : BlackBishop;

    super(tile, color, bishopImage, ChessFigures.Bishop);
  }

  public getAvailableTiles(board: Board): Tile[] {
    let currRow = this.tile?.rowIdx!;
    let currCol = this.tile?.colIdx!;
    const availableTiles: Tile[] = [];

    // considered from the white side
    // top left traverse
    // Move starting coordinate to the top left
    currRow--;
    currCol--;

    while (currRow >= 0 && currCol >= 0) {
      const tile = board.getTile(currRow, currCol);

      if (!tile) {
        break;
      }

      if (tile.figure) {
        if (
          tile.figure.color !== this.color &&
          !(tile.figure instanceof King)
        ) {
          availableTiles.push(tile);
          break;
        } else {
          break;
        }
      } else {
        availableTiles.push(tile);
      }

      currRow--;
      currCol--;
    }

    currRow = this.tile?.rowIdx!;
    currCol = this.tile?.colIdx!;

    // top right traverse
    currRow--;
    currCol++;

    while (currRow >= 0 && currCol <= 7) {
      const tile = board.getTile(currRow, currCol);

      if (!tile) {
        break;
      }

      if (tile.figure) {
        if (
          tile.figure.color !== this.color &&
          !(tile.figure instanceof King)
        ) {
          availableTiles.push(tile);
          break;
        } else {
          break;
        }
      } else {
        availableTiles.push(tile);
      }

      currRow--;
      currCol++;
    }

    currRow = this.tile?.rowIdx!;
    currCol = this.tile?.colIdx!;

    // Bottom left traverse
    currRow++;
    currCol--;

    while (currRow <= 7 && currCol >= 0) {
      const tile = board.getTile(currRow, currCol);

      if (!tile) {
        break;
      }

      if (tile.figure) {
        if (
          tile.figure.color !== this.color &&
          !(tile.figure instanceof King)
        ) {
          availableTiles.push(tile);
          break;
        } else {
          break;
        }
      } else {
        availableTiles.push(tile);
      }

      currRow++;
      currCol--;
    }

    currRow = this.tile?.rowIdx!;
    currCol = this.tile?.colIdx!;

    // Bottom right traverse
    currRow++;
    currCol++;

    while (currRow <= 7 && currCol <= 7) {
      const tile = board.getTile(currRow, currCol);

      if (!tile) {
        break;
      }

      if (tile.figure) {
        if (
          tile.figure.color !== this.color &&
          !(tile.figure instanceof King)
        ) {
          availableTiles.push(tile);
          break;
        } else {
          break;
        }
      } else {
        availableTiles.push(tile);
      }

      currRow++;
      currCol++;
    }

    return availableTiles;
  }
}
