import React, { useEffect,useContext,useState} from 'react';
import './chess.css';
import Knight from '../images/knight.svg'
import Square from './square';
import Button from '@material-ui/core/Button';
import KnightPlacedContext from '../contexts/KnightPlacedContext';
import KnightPosContext from '../contexts/KnightPosContext';
import DestinationSelContext from '../contexts/DestinationSelContext';
import chessPositions from '../constants';
import DestPosContext from '../contexts/DestPosContext';


function Board(props){
    //const forceUpdate = useForceUpdate();
    const [board,setBoard]= useState([]);
    //const boardPieces = [];
    const {placed, setPlaced} = useContext(KnightPlacedContext);
    const {pos,setPos} = useContext(KnightPosContext);
    const {destSelected,setDest} = useContext(DestinationSelContext);
    const {destPos,setDestPos} = useContext(DestPosContext);
    const [boardInitialized,setBoardInitialized]=useState(false);
    var foundPos = false;
    var calculating=false;
    const isEven = (num)=>{
        return num%2==0;
    }
    //var visitedValueMoves=[];
    var possibleValueMoves=[];
    const stepColors = [{backgroundColor:'red'},{backgroundColor:'green'},{backgroundColor:'red'},{backgroundColor:'red'},{backgroundColor:'red'},{backgroundColor:'red'}]
    var step=0;
    const calc=()=>{
        calculating=true;
        //calc possible positions
        possiblePositions(pos,possibleValueMoves);
        console.log(board);

        const calcFunc=()=>{
            if(foundPos){
                clearInterval(calcFunc);
            }
            possibleValueMoves.forEach((val)=>{
                console.log(val);
                console.log(parseInt(val/8));
                console.log(board[(parseInt(val/8))].props.children[val%8]);
                board[(parseInt(val/8))].props.children[val%8]=<Square value={val} color={"square-selected " }  onClicked={onClickedFunc}></Square>
                //console.log(board[(parseInt(val/8))].props.children[val%8]);
                rerenderBoard();
                
            })
            if(possibleValueMoves.includes(destPos)){
                foundPos=true;
                possibleValueMoves=[];
            }
            else{
                step++;
                var newValueMoves=[];
                possibleValueMoves.forEach((val)=>{
                    possiblePositions(val,newValueMoves);
                })  
                possibleValueMoves=newValueMoves;

            }
        }
        calcFunc();
        setInterval(calcFunc,2000);

    }

    const rerenderBoard=()=>{
        let newBoard = [];
        board.forEach((row) => {
            newBoard.push(<div className="board-row">{[...row.props.children]}</div>);
        });
        setBoard(newBoard);
    }
    
    const possiblePositions=(posVal,possibleMoves)=>{
        var i= (parseInt(posVal/8));
        var j= posVal%8;
        
        if(((i-2)*8)>=0 && (j-1)>=0){
            if(posVal-17!=pos)possibleMoves.push(posVal-17);
        }
        if(((i-1)*8)>=0 && (j+1)<8){
            if(posVal-15!=pos)possibleMoves.push(posVal-15);
        }
        if(((i-1)*8)>=0 && (j-2)>=0){
            if(posVal-10!=pos)possibleMoves.push(posVal-10);
        }
        
        if(((i-1)*8)>=0 && (j+2)<8){
            if(posVal-6!=pos)possibleMoves.push(posVal-6);
        }

        if(((i+1)*8)<64 && (j-2)>=0){
            if(posVal+6!=pos)possibleMoves.push(posVal+6);
        }
        if(((i+1)*8)<64 && (j+2)<8){
            if(posVal+10!=pos)possibleMoves.push(posVal+10);
        }
        if(((i+2)*8)<64 && (j-1)>=0){
            if(posVal+15!=pos)possibleMoves.push(posVal+15); 
        }
        if(((i+2)*8)<64 && (j+1)<8){
            if(posVal+17!=pos)possibleMoves.push(posVal+17);
        }
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
                    //rowPieces.push()
                }
                board.push(<div className="board-row">{newRow}</div>);
                //boardPieces.push(rowPieces);
                //console.log(board);
            }
            setBoardInitialized(true);
            setBoard([...board]);
        }
        console.log("board was rerendered");
        console.log(board);
    })
    
    
    
    return(
        <div align="center" style={{display: 'flex',  justifyContent:'center', height: '100vh'}}>
            <div class="container">
                {board}
                <Button variant="contained" style={{marginTop:'2vh',backgroundColor:'#2a4d69',color:'#adcbe3'}} disabled={((destSelected && placed)||!calculating)?false:true} onClick={calc}>Calculate</Button>
            </div>
             
        </div>
    );
    
    
  
}

export default Board;


