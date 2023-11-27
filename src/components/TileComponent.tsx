import React from "react";
import uuid from "react-uuid";
import cN from "classnames";
import { defineTileColor } from "../helpers/defineTileColor";
import { ReactSVG } from "react-svg";
import { Tile } from "../models/Tile/Tile";
import { Figure } from "../models/figures/Figure";

type Props = {
  rowIdx: number;
  colIdx: number;
  tile: Tile;
  onFigureSelect: (figure: Figure) => void;
  selectedFigure: Figure | null;
  isHighlighted: boolean;
  mouseTile: Tile | null;
  availableTiles: Tile[];
  moveFigure: () => void;
  isAvailableToBeat: boolean;
};

const TileComponent = ({
  rowIdx,
  colIdx,
  tile,
  onFigureSelect,
  selectedFigure,
  isHighlighted,
  mouseTile,
  availableTiles,
  moveFigure,
  isAvailableToBeat,
}: Props) => {
  // handlers
  const handleClick = () => {
    onFigureSelect(tile.figure!);
    moveFigure();
  };

  const getCellId = (rowIdx: number, colIdx: number): string =>
    `r${rowIdx}c${colIdx}`;

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        handleClick();
      }}
      key={uuid()}
      data-index={getCellId(rowIdx, colIdx)}
      className={cN("board__tile", "tile", defineTileColor(rowIdx, colIdx), {
        "tile--selected": selectedFigure?.tile === tile,
        "tile--beat-highlight": isAvailableToBeat,
      })}
    >
      {isHighlighted && (
        <div
          className={cN("tile--available", {
            "tile--highlight":
              mouseTile &&
              availableTiles.includes(mouseTile) &&
              tile === mouseTile,
          })}
        ></div>
      )}
      {tile.figure && (
        <ReactSVG src={tile.figure?.figureImage} className="board__figure" />
      )}
    </div>
  );
};

export default TileComponent;
