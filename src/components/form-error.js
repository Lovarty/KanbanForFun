import React from 'react';

function FormError (props) {
    let errorDescription = props.errorDescription;
    if (!errorDescription) {
        return null;
      }
    return (<div className="form-error">{errorDescription}</div>)
}

export default FormError;
