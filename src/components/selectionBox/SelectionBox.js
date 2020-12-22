import React, { useRef } from 'react';

import './Styles.scss';

const SelectionBox = ({ answer, id, collectChoices }) => {

  const selectElement = useRef()

  const boxSelection = () => {
    selectElement.current.classList.toggle("selectionBox__BoxSelected")
    collectChoices(selectElement.current.innerText)
  }

  return(
    <div
      className="selectionBox"
      id={"selectionBox" + id}
      ref={selectElement}
    >
      <img className="selectionBox__image" alt={answer.imageAlt} src={answer.image} />
      <input className="selectionBox__checkbox" type="checkbox" onClick={boxSelection} />
      <span className="selectionBox__text">{answer.text}</span>
    </div>
   )
}

export default SelectionBox;
