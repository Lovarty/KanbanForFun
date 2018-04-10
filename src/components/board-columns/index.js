import React, { Component } from 'react';

import Column from '../column/';

class BoardColumns extends Component {
    render() {
        const props = this.props;
        const BoardColumnsStyle = {
            display: 'grid',
            gridTemplateColumns: ' 1fr'.repeat(props.columnsAmount),
            height: 'calc(100% - 121px)'
        };
        return (
            <div style={BoardColumnsStyle}>
                {props.processStages.map((colData) => <Column key={colData.id}
                    stageId={colData.id}
                    data={colData}
                    getAssigneeInfoById={props.getAssigneeInfoById}
                    openPopup={props.openPopup}
                    changeTaskStage={props.changeTaskStage} 
                    changeTasksOrder={props.changeTasksOrder}/>)}
            </div>);
    }

}

export default BoardColumns;