import React from 'react';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';
import Card from './Card';

const grid = 8;

const StyledDiv = styled.div`
  border: 1px solid red;
  width: 250px;
  padding: ${grid}px;
  min-height: 100vh;
`;

const getListStyle = isDraggingOver => ({
  padding: grid,
  width: 250,
  'min-height': '100vh',
  border: '1px solid black',
});

const getStyle = isDraggingOver => ({
  display: isDraggingOver? 'block' : 'none',
  padding: grid * 2.5,
  backgroundColor: 'lightgrey',
});

function Column(props) {
  const {droppableId, items, title} = props;
  return (
    <div>
      {title}
      <Droppable droppableId={droppableId}>
      {(provided, snapshot) => (
        <StyledDiv
        ref={provided.innerRef}>
          {items.map((item, index) => (
            <Card key={item.id} item={item} index={index} />
            ))}
          <div style={getStyle(snapshot.isDraggingOver)}></div>
          {provided.placeholder}
        </StyledDiv>
      )}
    </Droppable>
  </div>
  );
}


export default Column;
