import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import './NewGame.css';
import buttonSound from '../../sound/button-pressed.mp3'

const NewGame = ({ reset }) => {
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setTimerRunning] = useState(false);
  //start button sound
  const buttonAudio = new Audio(buttonSound);
    //function definition for button sound
    const playButtonSound = () => {
        buttonAudio.play();
      };
      
  useEffect(() => {
    let intervalId;

    // Start the timer
    const startTimer = () => {
      setTimerRunning(true);
      intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    };

    // Stop the timer
    const stopTimer = () => {
      setTimerRunning(false);
      clearInterval(intervalId);
    };

    // Cleanup the interval when component unmounts
    return () => {
      stopTimer();
    };
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  const startTimer = () => {
    setTimerRunning(true);
    setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1);
    }, 1000);
  };
  //time format to display in hh:mm:ss
  const formatTime = (time) => {
    const hours = Math.floor(time / 3600).toString().padStart(2, '0');
    const minutes = Math.floor((time % 3600) / 60).toString().padStart(2, '0');
    const seconds = Math.floor(time % 60).toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };


  const handleNewGameClick = () => {
    playButtonSound(); //play button sound
    reset(); // Call the reset function provided as prop
    setTimer(0); // Reset the timer
    if (!isTimerRunning) {
      startTimer(); // Start the timer if it's not already running
    }
  };

  return (
    <div className='button-wrapper'>
       {/*  <button className='timer'>
        <FontAwesomeIcon icon={faClock} className="fa-beat" style={{color:'white'}} />
        <span className='timer-text'style={{color:'white'}}>{formatTime(timer)}</span>
  </button>*/}
      <button className="Newgame"onClick={handleNewGameClick}>New Game</button>
    </div>
  );
};

export default NewGame;
