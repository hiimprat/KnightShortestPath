import React, { useEffect, useState } from 'react';
import { BrowserRouter, Switch, Redirect, Route } from 'react-router-dom';
import KnightPlacedContext from './contexts/KnightPlacedContext';
import KnightPosContext from './contexts/KnightPosContext';
import DestinationSelContext from './contexts/DestinationSelContext';
import DestPosContext from './contexts/DestPosContext';
import Chess  from './components/chess';
function App() {

  const [placed, setPlaced] = useState(false);
  const [destSelected,setDest] = useState(false);
  const [pos,setPos] = useState(-1);
  const [destPos,setDestPos] = useState(-1);
  return (
    <div className="App">
      <DestPosContext.Provider value={{destPos,setDestPos}}>
        <DestinationSelContext.Provider value ={{destSelected,setDest}}>
          <KnightPlacedContext.Provider value = {{placed,setPlaced}}>
            <KnightPosContext.Provider value = {{pos,setPos}}>
              <BrowserRouter>
                <Route exact path="/" component={Chess} /> {}
              </BrowserRouter>
            </KnightPosContext.Provider>
          </KnightPlacedContext.Provider>
        </DestinationSelContext.Provider>
      </DestPosContext.Provider>
      
    </div>
  );
}

export default App;
