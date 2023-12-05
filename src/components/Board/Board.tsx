import { useState, useRef, useEffect } from "react";
import { useAppSelector } from "../../hooks/useAppSelector";
import { Tile } from "../TIle/TIle";
import "./board.css";
import { COLORS, ITile } from "../../types";

type Props = {};

export const Board = (props: Props) => {
  // Redux
  const { tiles } = useAppSelector((state) => state.game);

  // Local State
  const [availableTiles, setAvailableTiles] = useState<ITile[]>([]);
  const [hoveredTile, setHoveredTile] = useState<ITile | null>(null);
  const [whoseTurn, setWhoseTurn] = useState<COLORS>(COLORS.WHITE);

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
        console.log(rowIdx, colIdx, tile);
        setHoveredTile(tile);
      }
    };

    board.addEventListener("mousemove", handler);

    return () => {
      board.removeEventListener("mousemove", handler);
    };
  }, []);

  return (
    <div className="board" ref={boardRef}>
      {/* Drawing board */}
      {tiles.map((row) =>
        row.map((tile) => (
          <Tile
            tile={tile}
            setAvailableTiles={setAvailableTiles}
            isHighlighted={Boolean(
              availableTiles.find(
                (t) => t.rowIdx === tile.rowIdx && t.colIdx === tile.colIdx
              )
            )}
            hoveredTile={hoveredTile}
            whoseTurn={whoseTurn}
            setWhoseTurn={setWhoseTurn}
          />
        ))
      )}
    </div>
  );
};
