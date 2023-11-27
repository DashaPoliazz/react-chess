import WhiteKnight from "../../assets/figures/white/wn.svg";
import BlackKnight from "../../assets/figures/black/bn.svg";
import { ChessFigures, Colors, Figure } from "./Figure";
import { Tile } from "../Tile/Tile";
import { Board } from "../board/Board";
import { King } from "./King";

export class Knight extends Figure {
  constructor(tile: Tile, color: Colors) {
    const knightImage = color === Colors.WHITE ? WhiteKnight : BlackKnight;

    super(tile, color, knightImage, ChessFigures.Knight);
  }

  public getAvailableTiles(board: Board): Tile[] {
    const currRow = this.tile?.rowIdx!;
    const currCol = this.tile?.colIdx!;
    const availableTiles: Tile[] = [];

    // Considered from the white side
    let topLeftLeft = null;
    if (currRow - 1 >= 0) topLeftLeft = board.getTile(currRow - 1, currCol - 2);

    let topTopLeft = null;
    if (currRow - 2 >= 0) topTopLeft = board.getTile(currRow - 2, currCol - 1);

    let topTopRight = null;
    if (currRow - 2 >= 0) topTopRight = board.getTile(currRow - 2, currCol + 1);

    let topRightRight = null;
    if (currRow - 1 >= 0)
      topRightRight = board.getTile(currRow - 1, currCol + 2);

    let bottomLeftLeft = null;
    if (currRow + 1 <= 7)
      bottomLeftLeft = board.getTile(currRow + 1, currCol - 2);

    let bottomBottomLeft = null;
    if (currRow + 2 <= 7)
      bottomBottomLeft = board.getTile(currRow + 2, currCol - 1);

    let bottomRightRight = null;
    if (currRow + 1 <= 7)
      bottomRightRight = board.getTile(currRow + 1, currCol + 2);

    let bottomBottomRight = null;
    if (currRow + 2 <= 7)
      bottomBottomRight = board.getTile(currRow + 2, currCol + 1);

    if (topLeftLeft) {
      if (
        topLeftLeft.figure?.color !== this.color &&
        !(topLeftLeft.figure instanceof King)
      ) {
        availableTiles.push(topLeftLeft);
      }
    }

    if (topTopLeft) {
      if (
        topTopLeft.figure?.color !== this.color &&
        !(topTopLeft.figure instanceof King)
      ) {
        availableTiles.push(topTopLeft);
      }
    }

    if (topTopRight) {
      if (
        topTopRight.figure?.color !== this.color &&
        !(topTopRight.figure instanceof King)
      ) {
        availableTiles.push(topTopRight);
      }
    }

    if (topRightRight) {
      if (
        topRightRight.figure?.color !== this.color &&
        !(topRightRight.figure instanceof King)
      ) {
        availableTiles.push(topRightRight);
      }
    }

    if (bottomLeftLeft) {
      if (
        bottomLeftLeft.figure?.color !== this.color &&
        !(bottomLeftLeft.figure instanceof King)
      ) {
        availableTiles.push(bottomLeftLeft);
      }
    }

    if (bottomBottomLeft) {
      if (
        bottomBottomLeft.figure?.color !== this.color &&
        !(bottomBottomLeft.figure instanceof King)
      ) {
        availableTiles.push(bottomBottomLeft);
      }
    }

    if (bottomRightRight) {
      if (
        bottomRightRight.figure?.color !== this.color &&
        !(bottomRightRight.figure instanceof King)
      ) {
        availableTiles.push(bottomRightRight);
      }
    }

    if (bottomBottomRight) {
      if (
        bottomBottomRight.figure?.color !== this.color &&
        !(bottomBottomRight.figure instanceof King)
      ) {
        availableTiles.push(bottomBottomRight);
      }
    }

    return availableTiles;
  }
}
