import WhitePawn from "../../assets/figures/white/wp.svg";
import BlackPawn from "../../assets/figures/black/bp.svg";
import { ChessFigures, Colors, Figure } from "./Figure";
import { Tile } from "../Tile/Tile";
import { Board } from "../board/Board";

export class Pawn extends Figure {
  public isFirstTurn: boolean = true;

  constructor(tile: Tile, color: Colors) {
    const pawnImage = color === Colors.WHITE ? WhitePawn : BlackPawn;

    super(tile, color, pawnImage, ChessFigures.Pawn);
  }

  public getAvailableTiles(board: Board): Tile[] {
    const tiles: Tile[] = [];
    const currRow = this.tile?.rowIdx!;
    const currCol = this.tile?.colIdx!;

    // White
    if (this.color === Colors.WHITE) {
      const topOne = board.getTile(currRow - 1, currCol);

      console.log(topOne);

      // Top two tiles
      if (this.isFirstTurn) {
        const topTwo = board.getTile(currRow - 2, currCol);

        if (topOne && !topOne.figure) {
          tiles.push(topOne);
        }

        if (topTwo && !topTwo.figure) {
          if (!topOne?.figure) {
            tiles.push(topTwo);
          }
        }
      } else {
        if (topOne && !topOne.figure) {
          tiles.push(topOne);
        }
      }

      // Diagonal tiles
      const topLeft = board.getTile(currRow - 1, currCol - 1);
      const topRight = board.getTile(currRow - 1, currCol + 1);

      if (topLeft && topLeft.figure && topLeft.figure.color !== this.color) {
        tiles.push(topLeft);
      }
      if (topRight && topRight.figure && topRight.figure.color !== this.color) {
        tiles.push(topRight);
        console.log("!", topRight);
      }
    }

    // Black
    if (this.color === Colors.BLACK) {
      const topOne = board.getTile(currRow + 1, currCol);

      // Top two tiles
      if (this.isFirstTurn) {
        const topTwo = board.getTile(currRow + 2, currCol);

        if (topOne && !topOne.figure) {
          tiles.push(topOne);
        }
        if (topTwo && !topTwo.figure) {
          if (!topOne?.figure) {
            tiles.push(topTwo);
          }
        }
      } else {
        if (topOne && !topOne.figure) {
          tiles.push(topOne);
        }
      }

      // Diagonal tiles
      const bottomLeft = board.getTile(currRow + 1, currCol - 1);
      const bottomRight = board.getTile(currRow + 1, currCol + 1);

      if (
        bottomLeft &&
        bottomLeft.figure &&
        bottomLeft.figure.color !== this.color
      ) {
        tiles.push(bottomLeft);
      }
      if (
        bottomRight &&
        bottomRight.figure &&
        bottomRight.figure.color !== this.color
      ) {
        tiles.push(bottomRight);
      }
    }

    return tiles;
  }
}
