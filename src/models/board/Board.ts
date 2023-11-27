import { Tile } from "../Tile/Tile";
import { Bishop } from "../figures/Bishop";
import { ChessFigures, Colors, Figure } from "../figures/Figure";
import { King } from "../figures/King";
import { Knight } from "../figures/Knight";
import { Pawn } from "../figures/Pawn";
import { Queen } from "../figures/Queen";
import { Rook } from "../figures/Rook";

export class Board {
  public tiles!: Tile[][];
  public availableTiles: Tile[] = [];

  constructor() {
    this.InitializeBoard();
    this.setFigures();
  }

  public highlightCells(figure: Figure): void {
    if (!figure) {
      this.availableTiles = [];
      return;
    }

    switch (figure.figureName) {
      case ChessFigures.Pawn:
        if (figure instanceof Pawn) {
          const availableTiles = figure.getAvailableTiles(this);
          this.availableTiles = availableTiles;
        }
        break;
      case ChessFigures.Knight:
        if (figure instanceof Knight) {
          const availableTiles = figure.getAvailableTiles(this);
          this.availableTiles = availableTiles;
        }
        break;
      case ChessFigures.Bishop:
        if (figure instanceof Bishop) {
          const availableTiles = figure.getAvailableTiles(this);
          this.availableTiles = availableTiles;
        }
        break;
      case ChessFigures.Rook:
        if (figure instanceof Rook) {
          const availableTiles = figure.getAvailableTiles(this);
          this.availableTiles = availableTiles;
        }
        break;
      case ChessFigures.Queen:
        if (figure instanceof Queen) {
          const availableTiles = figure.getAvailableTiles(this);
          this.availableTiles = availableTiles;
        }
        break;
      case ChessFigures.King:
        if (figure instanceof King) {
          const availableTiles = figure.getAvailableTiles(this);
          this.availableTiles = availableTiles;
        }
        break;
      default:
        this.availableTiles = [];
        break;
    }
  }

  public getCopyBoard(): Board {
    const newBoard = new Board();

    newBoard.tiles = this.tiles;
    newBoard.availableTiles = this.availableTiles;

    return newBoard;
  }

  public getTile(rowIdx: number, colIdx: number): Tile | null {
    if (rowIdx > 7 || colIdx > 7) {
      return null;
    }

    return this.tiles[rowIdx][colIdx];
  }

  public getTileByKey(key: string): Tile | null {
    return this.getTile(Number(key[1]), Number(key[3]))
      ? this.getTile(Number(key[1]), Number(key[3]))
      : null;
  }

  private setPawns(): void {
    // Setting black Pawns
    this.tiles[1].forEach((tile) => new Pawn(tile, Colors.BLACK));
    // Setting white Pawns
    this.tiles[6].forEach((tile) => new Pawn(tile, Colors.WHITE));
  }

  private setRooks(): void {
    // Setting white rooks
    new Rook(this.getTile(7, 0)!, Colors.WHITE);
    new Rook(this.getTile(7, 7)!, Colors.WHITE);
    // Setting black rooks
    new Rook(this.getTile(0, 0)!, Colors.BLACK);
    new Rook(this.getTile(0, 7)!, Colors.BLACK);
  }

  private setKnights(): void {
    // Setting white knights
    new Knight(this.getTile(7, 1)!, Colors.WHITE);
    new Knight(this.getTile(7, 6)!, Colors.WHITE);
    // Setting black knights
    new Knight(this.getTile(0, 1)!, Colors.BLACK);
    new Knight(this.getTile(0, 6)!, Colors.BLACK);
  }

  private setBishops(): void {
    // Setting white bishops
    new Bishop(this.getTile(7, 2)!, Colors.WHITE);
    new Bishop(this.getTile(7, 5)!, Colors.WHITE);
    // Setting black bishops
    new Bishop(this.getTile(0, 2)!, Colors.BLACK);
    new Bishop(this.getTile(0, 5)!, Colors.BLACK);
  }

  private setQueens(): void {
    // Setting white queen
    new Queen(this.getTile(7, 3)!, Colors.WHITE);
    // Setting black queen
    new Queen(this.getTile(0, 3)!, Colors.BLACK);
  }

  private setKings(): void {
    // Setting white King
    new King(this.getTile(7, 4)!, Colors.WHITE);
    // Setting black King
    new King(this.getTile(0, 4)!, Colors.BLACK);
  }

  private setFigures(): void {
    this.setPawns();
    this.setRooks();
    this.setKnights();
    this.setBishops();
    this.setQueens();
    this.setKings();
  }

  private createBoard(): Tile[][] {
    const tiles: Tile[][] = [];

    for (let rowIdx = 0; rowIdx < 8; rowIdx++) {
      const row = [];

      for (let colIdx = 0; colIdx < 8; colIdx++) {
        const tile = new Tile(rowIdx, colIdx);

        row.push(tile);
      }

      tiles.push(row);
    }

    return tiles;
  }

  private InitializeBoard(): void {
    const tiles = this.createBoard();

    this.tiles = tiles;
  }
}
