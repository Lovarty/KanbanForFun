import React, { Component } from 'react';

class Task extends Component {

    openPopup = () => {
        this.props.openPopup(this.props.data.id, this.props.categoryId);
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