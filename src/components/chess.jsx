import React, { useContext, useState } from 'react';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import Chessboard from 'chessboardjsx';
import Board from './board';

function Chess(){
    return (
        <div>
            <Board/>

        </div>
    );
}

export default Chess;