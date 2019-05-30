import React from 'react'
import { Draggable } from 'react-beautiful-dnd';


const grid = 8;

const getItemStyle = (isDragging, draggableStyle, color) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,
  borderRadius: 2,

  // change background colour if dragging
  background: isDragging ? 'lightgreen' : `${color}`,

  // styles we need to apply on draggables
  ...draggableStyle
});

function Card(props) {
  const {item, index} = props;
  return(
    <Draggable
    key={item.id}
    draggableId={item.id}
    index={index}>
      {(provided, snapshot) => (
        <div
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        style={getItemStyle(
          snapshot.isDragging,
          provided.draggableProps.style,
          item.color
          )}>
            <div><b>{item.company}</b></div>
            <div>{item.position}</div>
        </div>
      )}
    </Draggable>
  );
}

export default Card;