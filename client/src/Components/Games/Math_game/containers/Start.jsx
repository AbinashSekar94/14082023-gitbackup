import React from 'react';
import Button from '../components/Button';
import Input from '../components/Input';
import { Session } from '../utils/storage'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faGraduationCap} from '@fortawesome/free-solid-svg-icons';

class Start extends React.Component {

    state = {
        player: "player"
    }

    setNameOfPlayer = (event) => {
        this.setState({ player: event.target.value })
    }

    clicked = () => {
        Session.set("onlinePlayer", this.state.player)
        this.props.startPressed();
    }

    render (){
        return (
            <div className="Mathgame_p">
                <div className="Mathgame-brandname">
                    <i className="fas fa-graduation-cap"></i> 
                    <br/>    
                    <h3>Do You Know</h3>     
                    <h1>Math?</h1>
                </div>
                {/* <Input text="Insert your name" onInputChange={this.setNameOfPlayer} /> */}
                <p>
                    Press to start the game
                </p>
                <Button isClicked={this.clicked}>Start</Button>
            </div>
        )
    }
}
export default Start;