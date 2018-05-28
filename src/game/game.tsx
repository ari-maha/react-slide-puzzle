import * as React from 'react';
import './game.css';

import { Board, IBoardProps, ISquare} from '../board/board';


export class Game extends React.Component<object, IBoardProps> {
    constructor(props : object) {
        super(props);
        this.state = {
            hasWon : false,
            squares : this.generateSquares()
        }
    }

    public render() {
        return (
            <div>
                <button onClick={this.resetGame}>Reset Game</button>
                <Board 
                    squares={this.state.squares}
                    hasWon={this.state.hasWon}
                />
            </div>
        );
    }

    private resetGame = () => {
        this.setState({
            hasWon : false,
            squares : this.generateSquares()
        })
    }

    private generateSquares() {
        const returnArray = [];
        const count = 3;
        for (let i = 0; i < count; i++) {
            const innerArray : ISquare[] = [];
            for (let j = 0; j < count; j++) {
                innerArray.push({
                    marker : (i*3) + j + 1
                });
            }
            returnArray.push(innerArray);
        }
        return returnArray;
    }
}