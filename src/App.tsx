import React, { useEffect, useRef, useState } from "react";
import "./css/main.css";
import { Board } from "./components/Board/Board";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { useAppSelector } from "./hooks/useAppSelector";

function App() {
  const [modal, setModal] = useState(false);
  const winnerRef = useRef(null);
  const { winner } = useAppSelector((state) => state.game);
  const naviage = useNavigate();

  useEffect(() => {
    setModal(true);
  }, [winner]);

  useEffect(() => {
    const winner = winnerRef.current;

    if (!winner) return;

    const handleClick = (e: MouseEvent) => {
      if (e.target !== winner) {
        setModal(false);
      }
    };

    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, []);

  const handleStartNewGame = () => {
    naviage("/");
    setModal(false);
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/board" element={<Board />} />
        <Route path="/" element={<Home />} />
      </Routes>
      {winner && modal && (
        <dialog ref={winnerRef}>
          <p>Congratulations, {winner}</p>
          <button className="modal__button" onClick={handleStartNewGame}>
            Want start new game?
          </button>
        </dialog>
      )}
    </div>
  );
}

export default App;
