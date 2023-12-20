import "./tile.css";
import classNames from "classnames";
import { COLORS, FIGURE_NAMES, ITile } from "../../types";
import { Figure } from "../Figure/Figure";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useActions } from "../../hooks/useActions";
import {
  getAvailableTiles,
  validateAvailableTilesForKing,
} from "../../helpers/getAvailableTiles";
import { availableTurnsToAvoidCheckMate } from "../../helpers/availableTurnsToAvoidCheckmate";
import { findFigure } from "../../helpers/findFigure";
import { isKingInCheck } from "../../helpers/isKingInCheck";
import { getFigureById } from "../../helpers/getFigureById";
import { isCheckAfterTurn } from "../../helpers/isCheckAfterTurn";

type Props = {
  tile: ITile;
  setAvailableTiles: (tiles: ITile[]) => void;
  isHighlighted: boolean;
  hoveredTile: ITile | null;
  whoseTurn: COLORS;
  setWhoseTurn: (side: COLORS) => void;
  isEnemyFigure: boolean;
  isKingCheck: boolean;
  kingCheck: COLORS | undefined;
  hasBeenChecked: boolean;
};

export const Tile = ({
  tile,
  setAvailableTiles,
  isHighlighted,
  hoveredTile,
  whoseTurn,
  setWhoseTurn,
  isEnemyFigure,
  isKingCheck,
  kingCheck,
  hasBeenChecked,
}: Props) => {
  // Redux
  const { selectedTile, tiles, side, winner } = useAppSelector(
    (state) => state.game
  );
  const { setSelectedTile, moveFigure, setWinner } = useActions();

  // Handlers
  const handleTileClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (winner) {
      return;
    }

    setSelectedTile(tile);

    const availableTiles: (ITile | null)[] = getAvailableTiles(tiles, tile);

    // Если королю обьявлен шах то нужно сетнуть availableTiles в другое состояние
    if (kingCheck) {
      const king = findFigure(FIGURE_NAMES.KING, kingCheck, tiles);

      const [isChecked, figureCheckFrom] = isKingInCheck(king!, tiles);
      const outs = availableTurnsToAvoidCheckMate(
        king!,
        tiles,
        figureCheckFrom
      );
      const availableFigures = [];

      // Click on the king
      if (tile.name === FIGURE_NAMES.KING && tile.color === kingCheck) {
        // King can retreate?
        if (outs.availableMovesForKing.length) {
          setAvailableTiles(outs.availableMovesForKing);
          availableFigures.push(tile);
        }
      }

      const figuresCanBlockIds = Object.keys(outs.figuresToBlock);

      // Clicked on figure that can block kingCheck
      if (figuresCanBlockIds.length) {
        for (const key in outs.figuresToBlock) {
          if (tile.id === key) {
            setAvailableTiles(outs.figuresToBlock[key]);

            const figure = getFigureById(key, tiles);

            availableFigures.push(figure);
          }
        }
      }

      // TODO:
      // Click on figure that can eat a figure the check comes from
      const figuresCanSaveIds = Object.keys(outs.figuresCanSave);

      if (figuresCanSaveIds.length) {
        for (const key in outs.figuresCanSave) {
          if (tile.id === key) {
            setAvailableTiles(outs.figuresCanSave[key]);
            const figure = getFigureById(key, tiles);
            console.log(figure);
            availableFigures.push(figure);
          }
        }
      }

      const idx = availableFigures.findIndex(
        (t) => t?.rowIdx === tile.rowIdx && t.colIdx === tile.colIdx
      );

      if (idx === -1) {
        setAvailableTiles([]);
      }
    } else {
      if (tile.name === FIGURE_NAMES.KING) {
        const validatedTiles = validateAvailableTilesForKing(
          availableTiles as ITile[],
          tile,
          tiles
        );

        console.log(validatedTiles);
        setAvailableTiles(validatedTiles as ITile[]);
      } else {
        setAvailableTiles(availableTiles as ITile[]);
      }
    }

    if (
      hoveredTile &&
      selectedTile &&
      isHighlighted &&
      whoseTurn === selectedTile.color
    ) {
      // Check for ability to do move
      const isAvailableTurn = isCheckAfterTurn(
        tiles,
        selectedTile,
        hoveredTile
      );

      if (isAvailableTurn) {
        console.log("CHECK AFTER TURN");
        return;
      }

      moveFigure({
        from: selectedTile,
        to: hoveredTile,
      });

      if (hoveredTile.name === FIGURE_NAMES.KING) {
        setWinner(selectedTile.color);
      }
      setAvailableTiles([]);
      setWhoseTurn(whoseTurn === COLORS.WHITE ? COLORS.BLACK : COLORS.WHITE);
    }
  };

  return (
    <div
      className={classNames("board__tile", "tile", {
        "tile--black":
          (tile && tile.rowIdx % 2 === 0 && tile?.colIdx % 2 === 0) ||
          (tile && tile.rowIdx % 2 === 1 && tile.colIdx % 2 === 1),
        "tile--white":
          (tile && tile.rowIdx % 2 === 0 && tile.colIdx % 2 === 1) ||
          (tile && tile.rowIdx % 2 === 1 && tile.colIdx % 2 === 0),
        "tile--selected": selectedTile === tile && selectedTile.name,
        rotate: side === COLORS.BLACK,
        "tile--red": isEnemyFigure,
        "tile--checked-king": isKingCheck,
      })}
      onClick={handleTileClick}
      data-index={`${tile.rowIdx}-${tile.colIdx}`}
    >
      {tile.name && tile.color && (
        <Figure figure={tile.name} color={tile.color} />
      )}
      {isHighlighted && !isEnemyFigure && (
        <div className="tile__highlighted"></div>
      )}
    </div>
  );
};
