import React from "react";

function PalContainer(props) {
    return (
        <li className="pal">
            <h2 className="heading pal-name">{props.name}</h2>
            <div>
                <h6 className="pal-props">• {props.type}</h6>
                <h6 className="pal-props">• {props.frequency}</h6>
            </div>
            
            
        </li>
        
    );
}

export default PalContainer;
