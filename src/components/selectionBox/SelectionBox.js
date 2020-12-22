import React from 'react';

import './Styles.scss';

const SelectionBox = (props) => {
  let infoColor = null;
  if (props.infoColor) {
    infoColor = props.answer.isCorrect && props.solved ? 'selectionBox--correct' : 'selectionBox--incorrect';    
  }

  const classModifiers = `${props.checked ? `selectionBox--active ${infoColor}` : null}`
  return(
    <div
      className={`selectionBox  ${classModifiers}`}
      id={"selectionBox" + props.id}
    >
      <img className="selectionBox__image" alt={props.answer.imageAlt} src={props.answer.image} />
      <input 
        className="selectionBox__checkbox" 
        id={props.id}
        type="checkbox" 
        checked={props.checked} 
        onChange={props.onChange}   
      />
      <span className="selectionBox__text">{props.answer.text}</span>
    </div>
   )
}

export default SelectionBox;
