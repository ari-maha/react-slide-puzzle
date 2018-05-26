import * as React from 'react';
import './board.css';

import {Square, ISquareProps} from '../square/square';


export class Board extends React.Component<ISquareProps, object> {
    render() {
        return (
            <Square position={this.props.position} marker={this.props.marker} onClick={this.props.onClick}/>
        )
    }
}
