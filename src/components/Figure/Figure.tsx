import { ReactSVG } from "react-svg";
import { COLORS, FIGURE_NAMES } from "../../types";

import WHITEBISHOP from "../../assets/figures/white/wb.svg";
import BLACKBISHOP from "../../assets/figures/black/bb.svg";
import WHITEKING from "../../assets/figures/white/wk.svg";
import BLACKKING from "../../assets/figures/black/bk.svg";
import WHITEKNIGHT from "../../assets/figures/white/wn.svg";
import BLACKKNIGHT from "../../assets/figures/black/bn.svg";
import WHITEPAWN from "../../assets/figures/white/wp.svg";
import BLACKPAWN from "../../assets/figures/black/bp.svg";
import WHITEQUEEN from "../../assets/figures/white/wq.svg";
import BLACKQUEEN from "../../assets/figures/black/bq.svg";
import WHITEROOK from "../../assets/figures/white/wr.svg";
import BLACKROOK from "../../assets/figures/black/br.svg";

type Props = {
  figure: FIGURE_NAMES;
  color: COLORS;
};

export const Figure = ({ figure, color }: Props) => {
  let imagePath = "";

  switch (figure) {
    case FIGURE_NAMES.BISHOP:
      imagePath = color === COLORS.WHITE ? WHITEBISHOP : BLACKBISHOP;
      break;
    case FIGURE_NAMES.KING:
      imagePath = color === COLORS.WHITE ? WHITEKING : BLACKKING;
      break;
    case FIGURE_NAMES.KNIGHT:
      imagePath = color === COLORS.WHITE ? WHITEKNIGHT : BLACKKNIGHT;
      break;
    case FIGURE_NAMES.PAWN:
      imagePath = color === COLORS.WHITE ? WHITEPAWN : BLACKPAWN;
      break;
    case FIGURE_NAMES.QUEEN:
      imagePath = color === COLORS.WHITE ? WHITEQUEEN : BLACKQUEEN;
      break;
    case FIGURE_NAMES.ROOK:
      imagePath = color === COLORS.WHITE ? WHITEROOK : BLACKROOK;
      break;
    default:
      return null;
  }

  return (
    <ReactSVG
      src={imagePath}
      style={{
        pointerEvents: "none",
      }}
    />
  );
};
