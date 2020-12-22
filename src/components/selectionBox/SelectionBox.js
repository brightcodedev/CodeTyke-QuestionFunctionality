import React from 'react';

import './Styles.scss';

const SelectionBox = ({ answer, checked, handleChange, isSubmitted, allAnswersCorrect }) => {
  const id = answer.id;

  let selectionBoxClass = 'selectionBox';

  if (checked) {
    if (isSubmitted) {
      if (allAnswersCorrect) {
        selectionBoxClass += ' selectionBox--correct';
      } else {
        selectionBoxClass += ' selectionBox--wrong';
        //how do I make this change temporary?
      }
    } else {
      selectionBoxClass += ' selectionBox--selected';
    }
  };

  return(
    <div
      className={selectionBoxClass}
      id={"selectionBox" + id}
    >
      <img className="selectionBox__image" alt={answer.imageAlt} src={answer.image} />
      <input
        id={"answer" + id}
        className="selectionBox__checkbox"
        type="checkbox"
        name={id}
        value
        checked={checked}
        onChange={handleChange}
      />
      <label htmlFor={"answer" + id} className="selectionBox__text">{answer.text}</label>
    </div>
   )
}

export default SelectionBox;
