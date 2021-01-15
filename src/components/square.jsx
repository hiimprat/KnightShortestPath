import React, { useContext,useState} from 'react';
import '../index.css';
import Knight from '../images/knight.svg'
import KnightPlacedContext from '../contexts/KnightPlacedContext';
import KnightPosContext from '../contexts/KnightPosContext';
import DestinationSelContext from '../contexts/DestinationSelContext';
import DestPosContext from '../contexts/DestPosContext';

function Square(props){
    const value = props.value;
    const  {color} = props;
    const  [style,setStyle] = useState({});
    const {placed, setPlaced} = useContext(KnightPlacedContext);
    const {pos,setPos} = useContext(KnightPosContext);
    const {destSelected,setDest} = useContext(DestinationSelContext);
    const {destPos,setDestPos} = useContext(DestPosContext);

    const test = ()=>{
        if(placed && value===pos){
            setStyle({}); 
            setPlaced(false);
            setPos(-1);
        }
        else if(!placed){
            setStyle({backgroundImage: "url('"+Knight+"')"});
            setPlaced(true);
            setPos(value);
        }
        else if(placed && !destSelected){
            setDestPos(value);
            setDest(true);
        }
        console.log("value: " + value);
        console.log("pos: " + pos);
        console.log("destPos: " + destPos);


    }

    return (
        <button className={"square " + color}
            onClick={test}
            style={style}
        >
        </button>
    );

}

export default Square;