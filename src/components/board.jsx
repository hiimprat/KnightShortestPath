import React, { useEffect,useContext,useState} from 'react';
import '../index.css';
import Knight from '../images/knight.svg'
import Square from './square';
import {Grid} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import KnightPlacedContext from '../contexts/KnightPlacedContext';
import KnightPosContext from '../contexts/KnightPosContext';
import DestinationSelContext from '../contexts/DestinationSelContext';
import chessPositions from '../constants';
import DestPosContext from '../contexts/DestPosContext';

function useForceUpdate(){
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => value + 1); // update the state to force render
}

function Board(props){
    const forceUpdate = useForceUpdate();
    const [board,setBoard]= useState([]);
    const {placed, setPlaced} = useContext(KnightPlacedContext);
    const {pos,setPos} = useContext(KnightPosContext);
    const {destSelected,setDest} = useContext(DestinationSelContext);
    const {destPos,setDestPos} = useContext(DestPosContext);
    const [boardInitialized,setBoardInitialized]=useState(false);
    const isEven = (num)=>{
        return num%2==0;
    }

    const possibleValueMoves=[];

    const calc=()=>{
        //calc possible positions
        possiblePositions(pos);
        console.log(board);
        possibleValueMoves.forEach((val)=>{
            //console.log(parseInt(val/8));
            //console.log(board[(parseInt(val/8))].props.children[val%8]);
            board[(parseInt(val/8))].props.children[val%8]=<Square value={val} color="square-selected " onClicked={onClickedFunc}></Square>
            console.log(board[(parseInt(val/8))].props.children[val%8]);
            
        })
        //board[(parseInt(pos/8))].props.children[pos%8]=<Square value={val} color="square-selected " style={backgroundImage: "url('"+Knight+"')"} onClicked={onClickedFunc}></Square>
        let newBoard = [];
        board.forEach((row) => {
            newBoard.push(<div className="board-row">{[...row.props.children]}</div>);
        });
        setBoard(newBoard);
        //forceUpdate();
        console.log(board);
        
    }
    
    const possiblePositions=(pos)=>{
        if(pos-17>0){
            possibleValueMoves.push(pos-17);
        }
        if(pos-15>0){
            possibleValueMoves.push(pos-15);
        }
        if(pos-10>0){
            possibleValueMoves.push(pos-10);
        }
        
        if(pos-6>0){
            possibleValueMoves.push(pos-6);
        }

        if(pos+6<63){
            possibleValueMoves.push(pos+6);
        }
        if(pos+10<63){
            possibleValueMoves.push(pos+10);
        }
        if(pos+15<63){
            possibleValueMoves.push(pos+15);
        }
        if(pos+17<63){
            possibleValueMoves.push(pos+17);
        }
        
        console.log(possibleValueMoves);
    }
    const onClickedFunc=(value)=>{   
        console.log(value);

    }
    
    useEffect(()=>{
        if(!boardInitialized){
            for(let i=0;i<8;i++){
                const newRow=[]
                for(let j=0;j<8;j++){
                    const color = (isEven(i) && isEven(j))||(!isEven(i)&&!isEven(j)) ? "light-square " : "dark-square ";
                    newRow.push(<Square value={(i*8)+j} color={color} onClicked={onClickedFunc}></Square>);
                }
                board.push(<div className="board-row">{newRow}</div>)
                //console.log(board);
            }
            setBoardInitialized(true);
            setBoard([...board]);
        }
        console.log("board was rerendered");
        console.log(board);
    })
    
    
    
    return(
        <div align="center" style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}>
            <div class="container">
                {board}
                <Button variant="contained" disabled={(destSelected && placed)?false:true} onClick={calc}>Calculate</Button>
            </div>
            
        </div>
    );
    
    
  
}

export default Board;


