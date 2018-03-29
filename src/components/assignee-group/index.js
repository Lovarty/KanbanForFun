import React, { Component } from 'react';
import SelectorWithImages from '../selector-with-images/';
import './assignee-group.scss';

class AssigneeGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditMode: !props.currentOptionIdentValue
        };
    }

    toggleEditMode = () => {
        this.setState((prevState) => {
            return {
                isEditMode: !prevState.isEditMode 
            }
        });
    }

    handleClickOnNewOption = (assigneeId) => {
        this.props.setNewAssignee(assigneeId);
        this.toggleEditMode();
    }

    render() {
        const assignee = this.props.getAssigneeInfoById(this.props.currentOptionIdentValue);
        return (
            assignee && !this.state.isEditMode ?
                (
                    <div className="assignee-group" onClick={this.toggleEditMode}>
                        <span>Assigned to </span>
                        <div className="assignee-info">
                            <img src={require('../../images/' + assignee.avatar)}
                                className="assignee-avatar justify-self--center"
                                alt={assignee.name + " avatar"}></img>
                            <span className="justify-self--center">{assignee.name}</span>
                        </div>
                    </div>

                ) : (
                    <SelectorWithImages options={this.props.assigneeOptions}
                        currentOptionIdentValue={this.props.currentOptionIdentValue}
                        fields={{ toIdent: "id", forImg: "avatar", forTitle: "name", toFindCurrent: "isCurrent" }}
                        handleClickOnNewOption={this.handleClickOnNewOption} />
                )
        );
    }
}

export default AssigneeGroup;