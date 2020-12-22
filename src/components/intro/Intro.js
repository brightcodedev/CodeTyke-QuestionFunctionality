import React from 'react';
import Button from '../button/Button';

import './Styles.scss';

const Intro = ({message, buttonLabel, buttonClick}) => {

    return (
        <div className="introContainer">
                <div className="introContainer__logo">
                    <img alt="logo" src="assets/logo.png" />            
                </div>
                <div className="introContainer__message">
                    {message}
                </div>
                <div className="introContainer__submitButton">
                    <Button label={buttonLabel || "Start"} handleClick={buttonClick} type="button" />
                </div>
        </div>
    )
}

export default Intro
