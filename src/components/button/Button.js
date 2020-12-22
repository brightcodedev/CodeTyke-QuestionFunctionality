import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSync } from '@fortawesome/free-solid-svg-icons'

import './Styles.scss';

const Button = ({ label, inactive, isLoading, customIcon, handleClick, type }) => {

  let icon;

  let loader = <FontAwesomeIcon icon={faSync} className={`submitButton__iconLoader`} />

  if(isLoading){
    icon = loader;
  } else if(customIcon){
    icon = customIcon;
  }

  return (
    <button type={type} className="submitButton" onClick={handleClick} disabled={inactive} >
      {label}
      <span className="submitButton__icon">
        {icon}
      </span>
    </button>
  )
}

export default Button;
