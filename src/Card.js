import React from 'react'
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { relative } from 'path';

const grid = 8;

const getItemStyle = (isDragging, draggableStyle, color) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,
  borderRadius: 2,
  position: 'relative',

  // change background colour if dragging
  background: isDragging ? 'lightgreen' : `${color}`,

  // styles we need to apply on draggables
  ...draggableStyle
});

const StyledX = styled.div`
  position: absolute;
  top: 2px;
  right: 4px;
`;

function Card(props) {
  function handleClick(evt){
    if(evt.target.innerHTML === ' x '){
      console.log(evt.target.getAttribute('id'))
      props.triggerDelete(evt.target.getAttribute('id'));
    }
  }

  const {item, index} = props;
  return(
    <Draggable
    key={item.id}
    draggableId={item.id}
    index={index}>
      {(provided, snapshot) => (
        <div
        id={item.id}
        onClick={handleClick}
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        style={getItemStyle(
          snapshot.isDragging,
          provided.draggableProps.style,
          item.color
          )}>
            <StyledX id={item.id}> x </StyledX>
            <div><b>{item.company}</b></div>
            <div>{item.position}</div>
        </div>
      )}
    </Draggable>
  );
}

export default Card;