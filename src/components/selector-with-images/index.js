import React, { Component } from 'react';
import './selector-with-images.scss';

const SCROLL_VIEW_AREA_HEIGHT = 72;

class SelectorWithImages extends Component {

    setNewCurrentOption = (fieldtoIdent, e) => {
        e.stopPropagation();
        this.props.handleClickOnNewOption(fieldtoIdent);
    }

    renderOption = (option) => {
        const isCurrent = option[this.props.fields.toIdent] === this.props.currentOptionIdentValue;
        return (
            <div className={"option " + (isCurrent ? "current-option" : "")}
                key={option[this.props.fields.toIdent]}
                onClick={e => this.setNewCurrentOption(option[this.props.fields.toIdent], e)}>
                <img src={require('../../images/' + option[this.props.fields.forImg])}
                    alt={option[this.props.fields.forTitle]} />
                <span>{option[this.props.fields.forTitle]}</span>
            </div>);
    }

    componentDidMount() {
        if (this.props.currentOptionIdentValue) {
            const scrollTopIncrement = SCROLL_VIEW_AREA_HEIGHT;
            const currentOptionIndex = this.props.options.map(option => option.id).indexOf(this.props.currentOptionIdentValue);
            const scrollRowNumber = Math.ceil((currentOptionIndex + 1) / 4);
            let scrollTop = 0;

            for (let i = 1; i < scrollRowNumber; i++) {
                scrollTop += scrollTopIncrement;
            }

            if (scrollTop) {
                this.selector.scrollTop = scrollTop;
            }
        }
    }

    render() {
        return (
            <div className="selector-with-images" ref={selector => this.selector = selector} >
                {
                    this.props.options.map(opt => this.renderOption(opt))
                }
            </div>
        );
    }
}

export default SelectorWithImages;