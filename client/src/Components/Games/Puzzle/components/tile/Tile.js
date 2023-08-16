import './Tile.css'
import clickSound from '../../sound/click-button.mp3'

const Tile = ({number,moveTile}) => 
    <div 
        onClick={() =>{
            const audio = new Audio(clickSound);
            audio.play();
             moveTile(number)} }
        className={`number ${number.value === number.index + 1 ? 'correct' : ''} ${number.value===16 ? 'disabled' : ''} slot--${number.index}`}>
        {number.value === 16 ? '' : number.value}
    </div>

export default Tile