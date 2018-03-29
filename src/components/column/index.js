import React, { Component } from 'react';
import Task from '../task/';
import './column.scss';

class Column extends Component {
    onDrop = (e, newCategoryId) => {
        e.preventDefault();
        var taskId = e.dataTransfer.getData("taskId");
        this.props.changeTaskStage(taskId, newCategoryId);
        console.log("OnDrop " + taskId);
        e.dataTransfer.clearData();
    }

    onDragOver = e => {
        e.preventDefault();
    }

    render() {
        const { title, tasks, id } = this.props.data;

        return (
            <div className="column" onDrop={e => this.onDrop(e, id)} onDragOver={e => this.onDragOver(e)}>
                <div>{title}</div>
                <div className="tasks-container">
                    {tasks.map((task) => <Task key={task.id}
                        stageId={this.props.stageId}
                        getAssigneeInfoById={this.props.getAssigneeInfoById}
                        data={task} assignees={this.props.assignees}
                        openPopup={this.props.openPopup} />)}
                </div>

            </div>);
    }
}

export default Column;