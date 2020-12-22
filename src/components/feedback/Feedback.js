import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'
import './Styles.scss';

export default function Feedback({correct}) {

  let icon = correct ? faCheck : faTimes;

  return (
    <div className={"feedback " + (correct ? 'feedback__correct' : 'feedback__incorrect')}>
      <FontAwesomeIcon icon={icon} className={`feedback__icon`} />
      {correct ? 'Correct' : 'Try again'}
    </div>
  )
}
