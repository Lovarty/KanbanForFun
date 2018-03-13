import React, { Component } from 'react';

class Popup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            description: "",
            formErrors: { title: '', description: '' },
            titleValid: false,
            descriptionValid: false,
            formValid: false
        }
    }

    handleChange = (e) => {
        const {name, value} = e.target;
        this.setState(
            { [name]: value },
            () => { this.validateField(name, value) });
    }

    validateField = (fieldName, value) => {
        let fieldValidationErrors = this.state.formErrors;
        let titleValid = this.state.titleValid;
        let descriptionValid = this.state.descriptionValid;

        switch (fieldName) {
            case 'title':
                titleValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                fieldValidationErrors.title = titleValid ? '' : ' is invalid';
                break;
            case 'description':
                descriptionValid = value.length >= 6;
                fieldValidationErrors.description = descriptionValid ? '' : ' is too short';
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
        this.props.addNewTask({ title: title, description: description });
    }
    render() {

        return (
            <div className='popup'>
                <div className='popup_inner'>
                    <h1>{this.props.text}</h1>
                    <div className="close-button button" onClick={this.props.closePopup}></div>
                    <form className="popup__form" onSubmit={this.handleSubmit}>
                        <div className="popup__form__group">
                            <label className="popup__form__label" htmlFor="titleInput">Title:</label>
                            <input id="titleInput" className={"popup__form__control" + (this.state.titleValid? '' : ' popup__form__control--invalid')} type="text" name="title" value={this.state.title} onChange={this.handleChange} />
                        </div>
                        <div className="popup__form__group">
                            <label className="popup__form__label" htmlFor="descriptionInput">Description:</label>
                            <input id="descriptionInput" className="popup__form__control" type="text" name="description" value={this.state.description} onChange={this.handleChange} />
                        </div>
                        <input type="submit" className="submit-button" value="Save" />
                    </form>
                </div>
            </div>
        );
    }
}

export default Popup;