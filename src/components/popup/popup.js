import React, { Component } from 'react';
import FormError from '../form-error/form-error';
import { MODE } from '../../common/constants';
import './popup.scss';


class Popup extends Component {
    constructor(props) {
        super(props);
        const isEditingMode = this.props.mode === MODE.editing;
        this.state = {
            title: props.task && props.task.title,
            description: props.task && props.task.description,
            formErrors: { title: '', description: '' },
            titleValid: isEditingMode,
            descriptionValid: isEditingMode,
            formValid: isEditingMode
        }

    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState(
            { [name]: value },
            () => { this.validateField(name, value) });
    }

    validateForm() {
        this.setState({ formValid: this.state.titleValid && this.state.descriptionValid });
    }

    validateField = (fieldName, value) => {
        let fieldValidationErrors = this.state.formErrors;
        let titleValid = this.state.titleValid;
        let descriptionValid = this.state.descriptionValid;

        switch (fieldName) {
            case 'title':
                titleValid = value.length >= 1;
                fieldValidationErrors.title = titleValid ? '' : 'Should be longer';
                break;
            case 'description':
                descriptionValid = value.length >= 1;
                fieldValidationErrors.description = descriptionValid ? '' : 'Should be longer';
                break;
            default:
                break;
        }
        this.setState({
            formErrors: fieldValidationErrors,
            titleValid: titleValid,
            descriptionValid: descriptionValid
        }, this.validateForm);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { title, description } = this.state;
        this.props.saveTask({ title: title, description: description });
    }
    render() {

        return (
            <div className="popup">
                <div className="popup_inner">
                    <h1>{this.props.text}</h1>
                    <div className="button  close-button" onClick={this.props.closePopup}></div>
                    <form className="popup__form" onSubmit={this.handleSubmit}>
                        <div className="popup__form__group">
                            <label className="popup__form__label" htmlFor="titleInput">Title:</label>
                            <input id="titleInput"
                                className={"popup__form__control" + (this.state.titleValid ? "" : " popup__form__control_invalid")}
                                type="text" name="title" value={this.state.title} onChange={this.handleChange} />
                            <FormError errorDescription={this.state.formErrors.title} />
                        </div>
                        <div className="popup__form__group">
                            <label className="popup__form__label" htmlFor="descriptionInput">Description:</label>
                            <input id="descriptionInput"
                                className={"popup__form__control" + (this.state.descriptionValid ? "" : " popup__form__control_invalid")}
                                type="text" name="description"
                                value={this.state.description} onChange={this.handleChange} />
                            <FormError errorDescription={this.state.formErrors.description} />
                        </div>
                        <input type="submit" disabled={!this.state.formValid} className="button  submit-button" value="Save" />
                    </form>
                </div>
            </div>
        );
    }
}

export default Popup;