import React, { Component } from 'react';
import Task from './task';

class Column extends Component {
    render() {
        const { title, tasks } = this.props.data;

        return (
            <div className="column">
                <div>{title}</div>
                <div className="task-container">
                    {tasks.map((task) => <Task key={task.id} categoryId={this.props.categoryId} data={task} openPopup={this.props.openPopup}/>)}
                </div>

            </div>);
    }
}

export default Column;