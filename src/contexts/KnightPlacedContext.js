import React from 'react';

const KnightPlacedContext = React.createContext({
    placed: {},
    setPlaced: () => {},
});

export default KnightPlacedContext;