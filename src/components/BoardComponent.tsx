import { useState } from "react";
import { Board } from "../models/board/Board";
import TileComponent from "./TileComponent";
import { Colors, Figure } from "../models/figures/Figure";
import { Tile } from "../models/Tile/Tile";
import { Pawn } from "../models/figures/Pawn";

type Props = {};

export const BoardComponent = (props: Props) => {
  const [isKingCheck, setIsKingCheck] = useState(false);
  const [isWhiteTurn, setIsWhiteTurn] = useState(true);
  const [board, setBoard] = useState<Board>(new Board());
  const [selectedFigure, setSelectedFigure] = useState<Figure | null>(null);
  const [mouseTile, setMouseTile] = useState<Tile | null>(null);

  const handleSelectFigure = (figure: Figure): void => {
    setSelectedFigure(figure);

    // Highlighting available cells
    board.highlightCells(figure);

    // Update Board
    const newBoard = board.getCopyBoard();
    setBoard(newBoard);
  };
  const handleMouseMove = (e: React.MouseEvent): void => {
    const domNode = e.target as HTMLDivElement;
    const key = domNode.getAttribute("data-index");

    if (key) {
      const mouseTile = board.getTileByKey(key);
      if (mouseTile && board.availableTiles.includes(mouseTile)) {
        setMouseTile(mouseTile);
      } else {
        setMouseTile(null);
      }
    } else {
      setMouseTile(null);
    }
  };
  const moveFigure = () => {
    if (isWhiteTurn) {
      if (selectedFigure?.color === Colors.WHITE) {
        if (selectedFigure && mouseTile && mouseTile !== selectedFigure.tile) {
          // Toggle turn state
          setIsWhiteTurn(!isWhiteTurn);

          mouseTile.figure = selectedFigure;

          if (selectedFigure.tile && selectedFigure.tile.figure) {
            selectedFigure.tile.figure = null;
            selectedFigure.tile = mouseTile;

            if (selectedFigure instanceof Pawn) {
              selectedFigure.isFirstTurn = false;
            }
          }

          setMouseTile(null);
          setSelectedFigure(null);

          // update board
          const newBoard = board.getCopyBoard();
          setBoard(newBoard);

          console.log(board.availableTiles);
        }
      }
    } else {
      if (selectedFigure?.color === Colors.BLACK) {
        if (selectedFigure && mouseTile && mouseTile !== selectedFigure.tile) {
          // Toggle turn state
          setIsWhiteTurn(!isWhiteTurn);

          mouseTile.figure = selectedFigure;

          if (selectedFigure.tile && selectedFigure.tile.figure) {
            selectedFigure.tile.figure = null;
            selectedFigure.tile = mouseTile;

            if (selectedFigure instanceof Pawn) {
              selectedFigure.isFirstTurn = false;
            }
          }

          setMouseTile(null);
          setSelectedFigure(null);

          // update board
          const newBoard = board.getCopyBoard();
          setBoard(newBoard);
        }
      }
    }
  };

  return (
    <div className="board" onMouseMove={handleMouseMove}>
      {/* Drawing board */}
      {board.tiles?.map((row, rowIdx) =>
        row.map((tile, colIdx) => (
          <TileComponent
            isAvailableToBeat={Boolean(
              mouseTile === tile &&
                tile.figure &&
                tile.figure.color !== selectedFigure?.color
            )}
            moveFigure={moveFigure}
            rowIdx={rowIdx}
            colIdx={colIdx}
            mouseTile={mouseTile}
            tile={tile}
            onFigureSelect={handleSelectFigure}
            selectedFigure={selectedFigure}
            isHighlighted={board.availableTiles.includes(tile)}
            availableTiles={board.availableTiles}
          />
        ))
      )}
    </div>
  );
};
