import React from 'react'
import Colors from '../constant/colors'

export default function Points ({ points}) {

    return (
        <span>
            <i className="fas fa-star" style={{ color:'yellow '}}></i> <b style={{color:'yellow'}}>{points}</b>
        </span>
        )

}