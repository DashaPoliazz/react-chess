import WhiteRook from "../../assets/figures/white/wr.svg";
import BlackRook from "../../assets/figures/black/br.svg";
import { ChessFigures, Colors, Figure } from "./Figure";
import { Tile } from "../Tile/Tile";
import { Board } from "../board/Board";
import { King } from "./King";

export class Rook extends Figure {
  constructor(tile: Tile, color: Colors) {
    const rookImage = color === Colors.WHITE ? WhiteRook : BlackRook;

    super(tile, color, rookImage, ChessFigures.Rook);
  }

  public getAvailableTiles(board: Board): Tile[] {
    let currRow = this.tile?.rowIdx!;
    let currCol = this.tile?.colIdx!;
    const availableTiles: Tile[] = [];

    // Considered the white side
    // Checking for the top
    currRow--;

    while (currRow >= 0) {
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
    }

    // Reset currRow
    currRow = this.tile?.rowIdx!;

    // Checking for the left
    currCol--;

    while (currCol >= 0) {
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

      currCol--;
    }

    currCol = this.tile?.colIdx!;

    // Cheking for right
    currCol++;

    while (currCol <= 7) {
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

      currCol++;
    }

    currCol = this.tile?.colIdx!;

    // Cheking for the bottom
    currRow++;

    while (currRow <= 7) {
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
    }

    currRow = this.tile?.rowIdx!;

    return availableTiles;
  }
}
