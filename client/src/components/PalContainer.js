import React from "react";

function PalContainer(props) {
    return (
        <li className="pal" onClick={() => window.location = props.route}>
            <h2 className="heading pal-name">{props.name}</h2>
            <div>
                <h6 className="pal-props"><span className="type-dot">•</span> {props.type}</h6>
                <h6 className="pal-props"><span className="frequency-dot">•</span> {props.frequency}</h6>
            </div>
            
            
        </li>
        
    );
}

export default PalContainer;
