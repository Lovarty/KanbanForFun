import React from 'react';

import Column from '../column/';

function BoardColumns(props) {

    const BoardColumnsStyle = {
        display: 'grid',
        gridTemplateColumns: ' 1fr'.repeat(props.columnsAmount),
        height: 'calc(100% - 121px)'
    };

    return (
        <div style={BoardColumnsStyle}>
            {props.processStages.map((colData) => <Column key={colData.id} stageId={colData.id} data={colData} openPopup={props.openPopup} />)}
        </div>);
}

export default BoardColumns;