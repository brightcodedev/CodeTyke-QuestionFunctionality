import React from 'react';
import { useState } from 'react';

import './Styles.scss';

const SelectionBox = (props) => {
  const [selected, setSelected] = useState(false);

  console.log({correctChoicesSelected: props.correctChoicesSelected})
  
  const handleClick = () => {
    setSelected(prevState => !prevState);

    const { id, choicesSelected, setChoicesSelected } = props;

    if (choicesSelected.includes(id)) {
      const newChoices = choicesSelected.filter(c => c !== id);
      setChoicesSelected(newChoices);
    } else {
      setChoicesSelected(prevState => [...prevState, id]);
    }
  }

  const getBackgroundStyle = () => {
    if (props.correctChoicesSelected === false && props.choicesSelected.includes(props.id)) {
      setTimeout(() => {
        props.setCorrectChoicesSelected(null)
        props.setChoicesSelected([])
        setSelected(false)
      }, 1000)

      return {backgroundColor: '#E94047'}
    } else if (props.correctChoicesSelected && props.choicesSelected.includes(props.id)) {
      return {backgroundColor: '#68CE72'}
    }
  }

  return(
    <div
      className={"selectionBox " + (selected ? "selectionBox--active" : "")}
      id={"selectionBox" + props.id}
      onClick={handleClick}
      style={getBackgroundStyle()}
    >
      <img className="selectionBox__image" alt={props.answer.imageAlt} src={props.answer.image} />
      <input 
      className={"selectionBox__checkbox " + (selected ? "selectionBox__checkbox--active" : "")}
      type="checkbox" />
      <span className={"selectionBox__text " + (selected ? "selectionBox__text--active" : "")}>{props.answer.text}</span>
    </div>
   )
}

export default SelectionBox;
