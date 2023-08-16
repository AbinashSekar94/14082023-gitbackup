import NewGame from '../new-game/NewGame'
import './Winner.css'
import Lottie from 'lottie-react';
import Winneranimation from './../../json file/win-celebration.json';

const Winner = ({numbers,reset}) => {
    if (!numbers.every(n => n.value === n.index +1))    
        return null

    return <div 
        className="winner">
           
        <p>You win!</p>
        <div className="lottie-background">
            <Lottie animationData={Winneranimation} className="lottie-winner" />
            </div>
        <NewGame reset={reset} />
    </div>
}

export default Winner