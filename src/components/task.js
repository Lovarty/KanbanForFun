import React, { Component } from 'react';

class Task extends Component {

    render() {
        const { title, description } = this.props.data;
        return (<div className="task">
            <div>{title}</div>
            <div>{description}</div>
        </div>);
    }
}

export default Task;