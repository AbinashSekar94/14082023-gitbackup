import { motion, AnimatePresence } from "framer-motion";
import './Tictoctoe.css';
import { useState,useEffect} from "react";
import Button from "./components/Button";
import Square from "./components/Square";
import backgroundVideo from "./video/clouds.mp4";
import friendAnimation from "./jsonfile/friendhands.json";
import Lottie from 'lottie-react';



function Tictoctoe() {
  const [squares, setSquares] = useState(Array(9).fill(""));
  const [turn, setTurn] = useState("x");
  const [winner, setWinner] = useState(null);
  const [showDialog, setShowDialog] = useState(true);

  const [backgroundStyle, setBackgroundStyle] = useState({});

  useEffect(() => {
    setBackgroundStyle({ backgroundImage: `url(${friendAnimation})` });
  }, []);


  const checkEndTheGame = () => {
    for (let square of squares) {
      if (!square) return false;
    }
    return true;
  };

  const checkWinner = () => {
    const combos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let combo of combos) {
      const [a, b, c] = combo;
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };

  const updateSquares = (ind) => {
    if (squares[ind] || winner) {
      return;
    }
    const s = squares;
    s[ind] = turn;
    setSquares(s);
    setTurn(turn === "x" ? "o" : "x");
    const W = checkWinner();
    if (W) {
      setWinner(W);
    } else if (checkEndTheGame()) {
      setWinner("x | o");
    }
  };

  const resetGame = () => {
    setSquares(Array(9).fill(""));
    setTurn("x");
    setWinner(null);
  };

  const closeDialog = () => {
    setShowDialog(false);
  };

  const userData = sessionStorage.getItem("userData");

  if (!userData) {
    return null; // or render a loading state if needed
  }

  return (
    <>
      <div className="tic-app-container">
        {showDialog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="tic-dialog-box"
          >
            <div className="tic-dialog-content">
              
              <h2>Welcome to Tic Tac Toe!</h2>
              <div className="friend-animation">
                <div className="friend-animation-inner">
              <Lottie animationData={friendAnimation} className="friendshand"/>
              </div>
              </div>
              <ol>
                  <li>Two friends take turns marking empty spaces in a 3x3 grid.</li>
                  <li>The first player marks their spaces with "X", and the second player marks their spaces with "O".</li>
                   <li>The goal is to get three of your marks in a row, either horizontally, vertically, or diagonally.</li>
                  <li>If all spaces on the grid are filled and no player has won, the game is a draw.</li>
                
             </ol>
             <p id="tic-toc-ready">Ready for a Tic Tac Toe showdown? Let's see who can handle the power of X's and O's</p>
              <button className="tic-close-button" onClick={closeDialog}>
                X
              </button>
            </div>
          </motion.div>
        )}

        <div className="tic-background-video">
          <video autoPlay muted loop className="tic-video-element">
            <source src={backgroundVideo} type="video/mp4" />
          </video>
        </div>
        
        <div className="tic-tac-toe-main">
          <h1 className="titleh1"> TIC TAC TOE </h1>
        </div>

        <div className="tic-tac-toe">
          <div className="tic-game">
            {Array.from("012345678").map((ind) => (
              <Square
                key={ind}
                ind={ind}
                updateSquares={updateSquares}
                clsName={squares[ind]}
              />
            ))}
          </div>
          <div className={`turn ${turn === "x" ? "left" : "right"}`}>
            <Square clsName="x" />
            <Square clsName="o" />
          </div>
          <AnimatePresence>
            {winner && (
              <motion.div
                key={"parent-box"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="winner"
              >
                <motion.div
                  key={"child-box"}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  className="tic-text"
                  style={backgroundStyle}
                  
                >
                  <motion.h2
                    initial={{ scale: 0, y: 100 }}
                    animate={{
                      scale: 1,
                      y: 0,
                      transition: {
                        y: { delay: 0.7 },
                        duration: 0.7,
                      },
                    }}
                  >
                    {winner === "x | o" ? "No Winner Match-Draw" : "Win !!"}
                  </motion.h2>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{
                      scale: 1,
                      transition: {
                        delay: 1.3,
                        duration: 0.2,
                      },
                    }}
                    className="win"
                  >
                    {winner === "x | o" ? (
                      <>
                        <Square clsName="x" />
                        <Square clsName="o" />
                      </>
                    ) : (
                      <>
                        <Square clsName={winner} />
                      </>
                    )}
                  </motion.div>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{
                      scale: 1,
                      transition: { delay: 1.5, duration: 0.3 },
                    }}
                  >
                    <Button resetGame={resetGame} />
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
          <Button resetGame={resetGame} />
        </div>
      </div>
    </>
  );
}

export default Tictoctoe;
