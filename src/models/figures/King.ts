import WhiteKing from "../../assets/figures/white/wk.svg";
import BlackKing from "../../assets/figures/black/bk.svg";
import { ChessFigures, Colors, Figure } from "./Figure";
import { Tile } from "../Tile/Tile";
import { Board } from "../board/Board";

export class King extends Figure {
  constructor(tile: Tile, color: Colors) {
    const kingImage = color === Colors.WHITE ? WhiteKing : BlackKing;
    super(tile, color, kingImage, ChessFigures.King);
  }

  public getAvailableTiles(board: Board): Tile[] {
    const currRow = this.tile?.rowIdx!;
    const currCol = this.tile?.colIdx!;
    const availableTiles: Tile[] = [];

    // Considered from the white side
    // Top
    let top = null;
    if (currRow - 1 >= 0) top = board.getTile(currRow - 1, currCol);

    if (top && !top.figure) availableTiles.push(top);

    // Right
    let right = null;
    if (currCol + 1 <= 7) right = board.getTile(currRow, currCol + 1);

    if (right && !right.figure) availableTiles.push(right);

    // Bottom
    let bottom = null;
    if (currRow + 1 <= 7) bottom = board.getTile(currRow + 1, currCol);

    if (bottom && !bottom.figure) availableTiles.push(bottom);

    // Left
    let left = null;
    if (currCol - 1 >= 0) left = board.getTile(currRow, currCol - 1);

    if (left && !left.figure) availableTiles.push(left);

    // Top left
    let topLeft = null;
    if (currRow - 1 >= 0) topLeft = board.getTile(currRow - 1, currCol - 1);

    if (topLeft && !topLeft.figure) availableTiles.push(topLeft);

    // Top right
    let topRight = null;
    if (currRow - 1 >= 0) topRight = board.getTile(currRow - 1, currCol + 1);

    if (topRight && !topRight.figure) availableTiles.push(topRight);

    // Bottom right
    let bottomRight = null;
    if (currRow + 1 <= 7) bottomRight = board.getTile(currRow + 1, currCol + 1);

    if (bottomRight && !bottomRight.figure) availableTiles.push(bottomRight);

    // Bottom left
    let bottomLeft = null;
    if (currRow + 1 <= 7) bottomLeft = board.getTile(currRow + 1, currCol - 1);

    if (bottomLeft && !bottomLeft.figure) availableTiles.push(bottomLeft);

    return availableTiles;
  }
}
