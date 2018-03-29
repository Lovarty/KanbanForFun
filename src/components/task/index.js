import React, { Component } from 'react';
import './task.scss';

class Task extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openTooltip: false
        };
    }

    handleMouseIn = (e) => {
        e.stopPropagation();
        this.setState({ openTooltip: true });
    }

    handleMouseOut = (e) => {
        e.stopPropagation();
        this.setState({ openTooltip: false });
    }

    openPopup = () => {
        this.props.openPopup({ taskId: this.props.data.id, stageId: this.props.stageId });
    }

    onDragStart = e => {
        e.dataTransfer.setData("taskId", e.target.id);
        console.log("Start to drag " + e.target.id);
    }

    render() {
        const { title, description, assigneeId, id } = this.props.data,
            assignee = this.props.getAssigneeInfoById(assigneeId);

        let avatar,
            avatarBackgroundStyle,
            tooltipStyle;

        if (assignee) {
            avatar = require("../../images/" + assignee.avatar);
            avatarBackgroundStyle = {
                backgroundImage: `url(${avatar})`
            };
            tooltipStyle = {
                display: this.state.openTooltip ? 'block' : 'none',
            };
        }

        return (<div className="task" draggable="true" onClick={this.openPopup} id={id} onDragStart={e => this.onDragStart(e)}>
            <div>{title}</div>
            <div>{description}</div>
            {
                assignee ?
                    (<div className="avatar"
                        style={avatarBackgroundStyle}
                        onMouseEnter={e => this.handleMouseIn(e)}
                        onMouseLeave={e => this.handleMouseOut(e)}>
                        <span className="tooltip" style={tooltipStyle}>{assignee.name}</span></div>)
                    : null
            }

        </div>);
    }
}

export default Task;