import * as React from 'react';

import './square.css';

export interface ISquareProps {
    position : number[];
    marker : number;
    onClick : any;
}

function Square(props : ISquareProps) {
    if (props.marker === 9) {
        return (<div className="square" />)
    }

    function clickHandler() {
        props.onClick(props.position);
    }

    return (
        <div className="square square-color" onClick={ clickHandler }>
            {props.marker}
        </div>
    )
}

export {Square};