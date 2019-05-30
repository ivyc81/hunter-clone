import React from 'react';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';
import Card from './Card';

const grid = 8;

const StyledDiv = styled.div`
  border: 1px solid grey;
  width: 12.5vw;
  padding: 10px 0;
`;

const StyledDrop = styled.div`
  box-sizing: border-box;
  width: 100%;
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
  const {droppableId, items, title, triggerDelete} = props;

  function deleteWithResource(index){
    triggerDelete(title, index);
  }

  return (
    <StyledDiv>
      <div>{title}</div>
      <div><small>{items.length} jobs</small></div>
      <Droppable droppableId={droppableId}>
      {(provided, snapshot) => (
        <StyledDrop
        ref={provided.innerRef}>
          {items.map((item, index) => (
            <Card triggerDelete={deleteWithResource} key={item.id} item={item} index={index} />
            ))}
          <div style={getStyle(snapshot.isDraggingOver)}></div>
          {provided.placeholder}
        </StyledDrop>
      )}
    </Droppable>
  </StyledDiv>
  );
}


export default Column;
