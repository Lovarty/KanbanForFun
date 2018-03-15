import React from 'react';

import Column from '../column/column';
import './board-columns.scss';


function BoardColumns(props) {
    return (
        <div className="board__columns">
            {props.processStages.map((colData) => <Column key={colData.id} stageId={colData.id} data={colData} openPopup={props.openPopup} />)}
        </div>);
}

export default BoardColumns;