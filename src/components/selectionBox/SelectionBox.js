import React from 'react';

import './Styles.scss';

const SelectionBox = ({id, answer}) => {
  return(
    <div
      className="selectionBox"
      id={"selectionBox" + id}
    >
      <img className="selectionBox__image" alt={answer.imageAlt} src={answer.image} />
      <input id={"answer" + id} className="selectionBox__checkbox" type="checkbox" />
      <label htmlFor={"answer" + id} className="selectionBox__text">{answer.text}</label>
    </div>
   )
}

export default SelectionBox;
