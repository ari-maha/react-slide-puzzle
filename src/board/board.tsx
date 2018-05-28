import * as React from 'react';
import './board.css';

import { ISquareProps, Square} from '../square/square';

export interface ISquare {
    marker : number;
}

export interface IBoardProps {
    hasWon : boolean;
    squares : ISquare[][];
}

export class Board extends React.Component<IBoardProps, IBoardProps> {

    constructor(props : IBoardProps) {
        super(props);
        this.state = {
            hasWon : this.props.hasWon,
            squares : this.props.squares
        }
    }

    public render() {
        return (
            <div>
                <div className="board">
                    {this.generateSquares()}
                </div>
                {this.getWinningMessage()}
            </div>
        );
    }

    public componentWillMount() {
        this.randomizeSelections();
    }

    public componentWillReceiveProps() {
        this.setState({
            hasWon : this.props.hasWon,
            squares : this.props.squares
        });
    }

    private getWinningMessage() {
        if (this.state.hasWon) {
            return "Congrats. You have won."
        }
        return null;
    }

    private getSquare(squareObject : ISquareProps) {
        return (
            <Square key={(squareObject.position[0]*3) + squareObject.position[1] + 1} position={squareObject.position} marker={squareObject.marker} onClick={squareObject.onClick} />
        )
    }

    private isEmptySquare(square : ISquare) {
        if (square.marker === 9) {
            return true;
        }
        return false;
    }

    private getMove(squares : ISquare[][], x : number, y : number) {
        // Check upper row
        if (x > 0) {
            if (this.isEmptySquare(squares[x-1][y])) {
                return [x-1, y];
            }
        }
        // check lower row
        if (x < 2) {
            if (this.isEmptySquare(squares[x+1][y])) {
                return [x+1, y];
            }
        }
        // check left column
        if (y > 0) {
            if (this.isEmptySquare(squares[x][y-1])) {
                return [x, y-1];
            }
        }
        // check right column
        if (y < 2) {
            if (this.isEmptySquare(squares[x][y+1])) {
                return [x, y+1];
            }
        }
        return null;
    }

    private getNewSquares(squares : ISquare[][], i : number, j : number) {
        const newPosition = this.getMove(squares, i , j);

        if (newPosition) {
            const newSquares : ISquare[][] = JSON.parse(JSON.stringify(squares));
            const oldMarkerValue = newSquares[i][j].marker;
            newSquares[i][j].marker = newSquares[newPosition[0]][newPosition[1]].marker;
            newSquares[newPosition[0]][newPosition[1]].marker = oldMarkerValue;
            return newSquares;
        }
        return null;
    }


    private handleClick(position : number[]) { 
        if (this.state.hasWon) {
            return;
        }
        const i : number = position[0];
        const j :number = position[1];
        if (this.isEmptySquare(this.state.squares[i][j])) {
            return ;
        }
        const newSquares = this.getNewSquares(this.state.squares, i , j);
        if (newSquares) {
            this.setState({
                squares : newSquares
            });
            if (this.checkWinner(newSquares)) {
                this.setState({
                    hasWon : true
                })
            }
        }
    }

    private checkWinner(squares : ISquare[][]) {
        const count = 3;
        const hasWon : boolean = true;
        for (let i = 0; i < count; i++) {
            for (let j = 0; j < count; j++) {
                if (squares[i][j].marker !== (i*3) + j + 1) {
                    return false;
                }
            }
        }
        return hasWon;
    }

    private randomizeSelections() {
        const totalChanges = 200;
        let count = 0;
        let stateArray = JSON.parse(JSON.stringify(this.state.squares));
        while (count < totalChanges) {
            const i = Math.floor(Math.random()*3);
            const j =  Math.floor(Math.random()*3);
            if (!this.isEmptySquare(stateArray[i][j])) {
                const newSquares = this.getNewSquares(stateArray, i , j);
                if (newSquares) {
                    stateArray = JSON.parse(JSON.stringify(newSquares));
                    count++;
                }
            }
        }
        this.setState({
            squares : stateArray
        })
    }


    private generateSquares(){
        const returnArray = [];
        for (let i = 0; i < this.state.squares.length; i++) {
            const squareArray : ISquare[] = this.state.squares[i];
            const innerArray = [];
            for (let j = 0; j < squareArray.length; j++) {
                innerArray.push(this.getSquare({
                    marker : squareArray[j].marker,
                    onClick : this.handleClick.bind(this),
                    position : [i,j],
                }));
            }
            returnArray.push(
                <div key={i+10} className="board-row">
                    {innerArray}
                </div>
            );
        }
        return returnArray;
    }
}
