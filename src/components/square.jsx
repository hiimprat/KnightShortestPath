import React, { useContext,useState} from 'react';
import './chess.css';
import Knight from '../images/knight.svg'
import KnightPlacedContext from '../contexts/KnightPlacedContext';
import KnightPosContext from '../contexts/KnightPosContext';
import DestinationSelContext from '../contexts/DestinationSelContext';
import DestPosContext from '../contexts/DestPosContext';

function Square(props){
    const value = props.value;
    const  {color} = props;
    const  [style,setStyle] = useState({});
    //const [highlight,setHighlight] = useState({});
    const {placed, setPlaced} = useContext(KnightPlacedContext);
    const {pos,setPos} = useContext(KnightPosContext);
    const {destSelected,setDest} = useContext(DestinationSelContext);
    const {destPos,setDestPos} = useContext(DestPosContext);
    const selectSquare = ()=>{
        if(placed && value===pos){
            setStyle({}); 
            setPlaced(false);
            setPos(-1);
        }
        else if(destSelected && value == destPos){
            setStyle({}); 
            setDest(false);
            setDestPos(-1);
        }
        else if(!placed){
            setStyle({backgroundImage: "url('"+Knight+"')"});
            setPlaced(true);
            setPos(value);
        }
        else if(placed && !destSelected){
            setDestPos(value);
            setDest(true);
            setStyle({opacity:'50%',backgroundColor:'red',borderColor:'blue',borderWidth:5});
        }
        else if(placed && destSelected){
            
        }
        props.onClicked(props.value);

    }
    const clicked = {opacity:'50%',backgroundColor:'purple'}

    return (
        <button className={"square " + color }
            onClick={selectSquare}
            style={style }
        >
        </button>
    );

}

export default Square;