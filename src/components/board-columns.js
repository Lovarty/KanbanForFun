import React from 'react';

import Column from './column';


function BoardColumns(props) {
    return (
        <div className="board__columns">
            {props.processStages.map((colData) => <Column key={colData.id} categoryId={colData.id} data={colData} openPopup={props.openPopup}/>)}
        </div>);
}

export default BoardColumns;