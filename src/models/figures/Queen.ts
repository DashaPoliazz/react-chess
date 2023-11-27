import WhiteQueen from "../../assets/figures/white/wq.svg";
import BlackQueen from "../../assets/figures/black/bq.svg";
import { ChessFigures, Colors, Figure } from "./Figure";
import { Tile } from "../Tile/Tile";
import { Board } from "../board/Board";
import { King } from "./King";

export class Queen extends Figure {
  constructor(tile: Tile, color: Colors) {
    const queenImage = color === Colors.WHITE ? WhiteQueen : BlackQueen;

    super(tile, color, queenImage, ChessFigures.Queen);
  }

  public getAvailableTiles(board: Board): Tile[] {
    let currRow = this.tile?.rowIdx!;
    let currCol = this.tile?.colIdx!;
    const availableTiles: Tile[] = [];

    // Borrowed from the rook movement
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

    // Borrowed from bishop movement
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
