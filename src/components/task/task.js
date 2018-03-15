import React, { Component } from 'react';
import './task.scss';

class Task extends Component {

    openPopup = () => {
        this.props.openPopup({ taskId: this.props.data.id, stageId: this.props.stageId });
    }
    render() {
        const { title, description } = this.props.data;
        return (<div className="task">
            <div>{title}</div>
            <div>{description}</div>
            <div className="button edit-button" onClick={this.openPopup}></div>
        </div>);
    }
}

export default Task;