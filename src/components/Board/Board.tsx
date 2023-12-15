import { useState, useRef, useEffect } from "react";
import { useAppSelector } from "../../hooks/useAppSelector";
import { Tile } from "../TIle/TIle";
import "./board.css";
import { COLORS, FIGURE_NAMES, ITile } from "../../types";
import classNames from "classnames";
import { findFigure } from "../../helpers/findFigure";
import { isKingInCheck } from "../../helpers/isKingInCheck";
import { getAvailableTilesForKing } from "../../helpers/getAvailableTilesForKing";
import { availableTurnsToAvoidCheckMate } from "../../helpers/availableTurnsToAvoidCheckmate";
import { useActions } from "../../hooks/useActions";

type Props = {};

const identity = (x: any) => x;

export const Board = (props: Props) => {
  // Redux
  const { tiles, side, selectedTile } = useAppSelector((state) => state.game);
  const { setWinner } = useActions();

  // Local State
  const [availableTiles, setAvailableTiles] = useState<ITile[]>([]);
  const [hoveredTile, setHoveredTile] = useState<ITile | null>(null);
  const [whoseTurn, setWhoseTurn] = useState<COLORS>(COLORS.WHITE);
  const [kingCheck, setKingCheck] = useState<COLORS | undefined>(undefined);
  const [hasBeenChecked, setHasBeenChecked] = useState(false);

  // Refs
  const boardRef = useRef<HTMLDivElement | null>(null);

  // Side effects
  useEffect(() => {
    const board = boardRef.current;

    if (!board) {
      return;
    }

    const handler = (e: MouseEvent) => {
      const item = e.target;

      if (!item) {
        return;
      }

      const dataIndex = (item as HTMLDivElement).getAttribute("data-index");

      if (dataIndex) {
        const key = dataIndex.split("-");
        const [rowIdx, colIdx] = key;
        const tile = tiles[+rowIdx][+colIdx];
        setHoveredTile(tile);
      }
    };

    board.addEventListener("mousemove", handler);

    return () => {
      board.removeEventListener("mousemove", handler);
    };
  }, []);

  useEffect(() => {
    const enemyKing = findFigure(FIGURE_NAMES.KING, whoseTurn, tiles)!;
    const [isChecked, figureCheckFrom] = isKingInCheck(enemyKing, tiles);

    if (isChecked) {
      setKingCheck(enemyKing.color);
      setHasBeenChecked(true);
    } else {
      setKingCheck(undefined);
    }
  }, [tiles, whoseTurn]);

  // CHECKMATE
  useEffect(() => {
    if (kingCheck) {
      const king = findFigure(FIGURE_NAMES.KING, kingCheck, tiles);

      if (king && kingCheck && hasBeenChecked) {
        const [isChecked, figureCheckFrom] = isKingInCheck(king, tiles);
        const kingAvailableTiles = getAvailableTilesForKing(king, tiles);

        if (!isChecked) {
          return;
        }

        const { availableMovesForKing, figuresCanSave, figuresToBlock } =
          availableTurnsToAvoidCheckMate(king, tiles, figureCheckFrom);

        console.log(figureCheckFrom);
        console.dir(
          availableTurnsToAvoidCheckMate(king, tiles, figureCheckFrom)
        );

        if (
          availableMovesForKing.length === 0 &&
          Object.keys(figuresCanSave).length === 0 &&
          Object.keys(figuresToBlock).length === 0
        ) {
          const winner =
            kingCheck === COLORS.WHITE ? COLORS.BLACK : COLORS.WHITE;
          setWinner(winner);
        }
      }
    }
  }, [kingCheck, whoseTurn, tiles, selectedTile, hasBeenChecked]);

  const renderNumbers = new Array(8).fill(0).map((_, idx) => (
    <div
      className={classNames("board__numbers", {
        rotate: side === COLORS.BLACK,
      })}
    >
      {idx + 1}
    </div>
  ));

  const renderLetters = new Array(8).fill(0).map((_, idx) => (
    <div
      className={classNames("board__letters", {
        rotate: side === COLORS.BLACK,
      })}
    >
      {String.fromCharCode(65 + idx)}
    </div>
  ));

  const isHighlighted = (tile: ITile) =>
    !!availableTiles.find(
      (t) => t.rowIdx === tile.rowIdx && t.colIdx === tile.colIdx
    );

  const isEnemyFigure = (tile: ITile) =>
    !!availableTiles.find(
      (t) =>
        t.rowIdx === tile.rowIdx &&
        t.colIdx === tile.colIdx &&
        t.color !== selectedTile?.color &&
        t.name
    );

  const isKingCheck = (tile: ITile) =>
    Boolean(
      tile.name && tile.name === FIGURE_NAMES.KING && tile.color === kingCheck
    );

  return (
    <div
      ref={boardRef}
      className={classNames("board", {
        rotate: side === COLORS.BLACK,
      })}
    >
      <div
        className={classNames("board__rows", "reverse-column", {
          "board__rows--white": side === COLORS.WHITE,
          "board__rows--black": side === COLORS.BLACK,
        })}
      >
        {renderNumbers.map(identity)}
      </div>

      {/* Drawing board */}
      {tiles.map((row) =>
        row.map((tile) => (
          <Tile
            tile={tile}
            setAvailableTiles={setAvailableTiles}
            isHighlighted={isHighlighted(tile)}
            isEnemyFigure={isEnemyFigure(tile)}
            hoveredTile={hoveredTile}
            whoseTurn={whoseTurn}
            isKingCheck={isKingCheck(tile)}
            setWhoseTurn={setWhoseTurn}
            kingCheck={kingCheck}
          />
        ))
      )}

      <div
        className={classNames("board__columns", {
          "board__columns--white": side === COLORS.WHITE,
          "board__columns--black": side === COLORS.BLACK,
        })}
      >
        {renderLetters.map(identity)}
      </div>
    </div>
  );
};
