import React, {useState} from 'react';
import '../index.css';
import Knight from '../images/knight.svg'
import Square from './square';
import Button from '@material-ui/core/Button';

function Board(props){
    
    const board=[];
    
    
    const isEven = (num)=>{
        return num%2==0;
    }
    const placePiece = [];

    for(let a =0;a<64;a++){
        placePiece.push({});
    }
    
        
    
    for(let i=0;i<8;i++){
        const newRow=[]
        for(let j=0;j<8;j++){
            const color = (isEven(i) && isEven(j))||(!isEven(i)&&!isEven(j)) ? "light-square" : "dark-square";
            newRow.push(<Square value={(i*8)+j} color={color}></Square>);
        }
        board.push(<div className="board-row">{newRow}</div>)

    }
    
    return(
        <div>
            <img src={Knight}/>
            {board}
            <Button variant="contained" >Calculate</Button>
        </div>
    );
    
    
  
}

export default Board;


