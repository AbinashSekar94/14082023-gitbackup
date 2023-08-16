import React from 'react'
import Colors from './../constant/colors';
import PropTypes from 'prop-types'



function Lifes({ lifes }) {

    let hearts = [];

    if (lifes < 5) {
        for (let i = 0; i < lifes; i++) {
            hearts.push(<i key={i} style={{marginLeft: "0.2em",}} className="fa-solid fa-heart"></i>)
        }
    } else {
        hearts.push(<i key={lifes} style={{marginLeft: "0.2em"}} className="fa-solid fa-heart"></i>)
    }

    
    return (
        // <span  id="life_color">
        //     {lifes > 4 && <b >{`${lifes}x`}</b> }
        //     {hearts}
        // </span>

        <span style={{color:'red'}}>
        {lifes > 4 && <b>{`${lifes}x`}</b> }
        {hearts}
    </span>
    );
}


Lifes.propTypes = {
    lifes: PropTypes.number.isRequired
}

export default Lifes