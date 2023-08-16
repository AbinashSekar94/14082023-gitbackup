import React,{useEffect, useState} from 'react'
import Board from './components/board/Board'
import '../Puzzle/Puzzle.css'
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import buttonSound from './sound/swing-sound.mp3'
import backgroundVideo_puzzle from './vid/puzzle_background.mp4';


export default function Puzzel() {
  const [showDialog, setShowDialog] = useState(true);
  const [userDataLoaded, setUserDataLoaded] = useState(false);
  const audio = new Audio(buttonSound);


  const handleCloseDialog = () => {
    setShowDialog(false);
  };

  const handlePlayButtonClick = () => {
    audio.play();
    // Additional logic or actions you want to perform when the button is clicked
  };
  
  useEffect(() => {
    const userDataFromStorage = sessionStorage.getItem('userData');
    if (userDataFromStorage) {
      setUserDataLoaded(true);
    }
  }, []);

  if (!userDataLoaded) {
    return null; // or render a loading state if needed
  }


  return (
    <>
      <video className="background-video_puzzle" autoPlay loop muted>
        <source src={backgroundVideo_puzzle} type="video/mp4" />
      </video>

    <div className='Puzzle_game'> 
    
    <div className="puzzle-maintitle-container">
        <h1  className="puzzle_maintitle" >NUMBER PUZZLE</h1>
      </div>
  
   
    <div className="puzzle_homelink">
    <Link to='/Games' className='button-link'>
    <div className='arrow-background'>
    <FontAwesomeIcon icon={faArrowLeft} className='button-icon'size="2x"/>
    </div>
    </Link>
    </div>
  
    <div className="board_home">
    
        <Board/>
           </div>  
    </div>
    
    {showDialog && (
       <div className="dialog-overlay">
        <div className="dialog-box">
        <h2 className="dailog-header">NUMBER PUZZLE</h2>
        <div className="dialog-content">
            <ol className="dailgbox-content">
              <li>Experience the excitement of rearranging numbers and engage your mind with the Number Puzzle Game</li>
              <li>Arrange the numbers from 1 to 15 in ascending order.</li>
              <li>Slide the numbers horizontally or vertically to move them.</li>
              <li>The empty space allows adjacent numbers to move into it.</li>
              <li>Continue rearranging until all numbers are in order.</li>
            </ol>
          
            </div>
            <div ClassName="dailog-container-button">
    
          <button className="comic-button" onClick={() => { handlePlayButtonClick(); handleCloseDialog(); }}>
        
            Play
          </button>
          </div>
          </div>
        </div>
      )}
    </>
    
  )
}
