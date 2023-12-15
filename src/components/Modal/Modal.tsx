import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./modal.css";
import { COLORS } from "../../types";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useActions } from "../../hooks/useActions";

type Props = {};

export const Modal = (props: Props) => {
  // Redux
  const { side } = useAppSelector((state) => state.game);
  const { setSide } = useActions();

  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === COLORS.WHITE) {
      setSide(COLORS.WHITE);
    } else {
      setSide(COLORS.BLACK);
    }
  };

  const handleGameStart = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate("/board");
  };

  return (
    <div className="modal">
      <header className="modal__header">
        <h1 className="modal__title">Welcome to Chess!</h1>
      </header>
      <main className="modal__main">
        <p className="modal__choose">Choose your side</p>
        <form className="modal__form" onSubmit={handleGameStart}>
          <div className="form__container">
            <label className="modal__label white-label">
              <p className="modal__color">White</p>
              <input
                className="white-label__input modal__input"
                onChange={handleInputChange}
                type="radio"
                value={COLORS.WHITE}
                checked={side === COLORS.WHITE}
              />
            </label>
            <label className="modal__label black-label">
              <p className="modal__color">Black</p>
              <input
                className="black-label__input modal__input"
                onChange={handleInputChange}
                type="radio"
                value={COLORS.BLACK}
                checked={side === COLORS.BLACK}
              />
            </label>
          </div>
          <button className="modal__button" type="submit">
            Start
          </button>
        </form>
      </main>
    </div>
  );
};
