import React from 'react';

import Column from './column';


function BoardColumns(props) {
    return (
        <div className="board__columns">
            {props.columnsData.map((colData) => <Column key={colData.id} data={colData}/>)}
        </div>);
}

export default BoardColumns;