import React, { Component } from 'react';
import Task from '../task/';
import './column.scss';

const taskPlaceholder = document.createElement("div");
taskPlaceholder.className = "task-placeholder";

class Column extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            tasks: props.data.tasks
         };
    }

    
    unFocus = () => {
        if (document.selection) {
            document.selection.empty();
        } else {
            window.getSelection().removeAllRanges();
        }
    } 

    render() {
        const { title} = this.props.data;

        return (
            <div className="column"
                onMouseMove={this.unFocus}
                onMouseUp={this.unFocus}>
                <div>{title}</div>
                <div className="tasks-container">
                    {this.state.tasks.map((task) => <Task
                        key={`task-${task.id}`}
                        stageId={this.props.stageId}
                        getAssigneeInfoById={this.props.getAssigneeInfoById}
                        data={task} assignees={this.props.assignees}
                        openPopup={this.props.openPopup} />)}
                </div>

            </div>);
    }
}

export default Column;