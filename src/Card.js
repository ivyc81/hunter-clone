import React, {useState} from 'react'
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import JobDetail from './JobDetail';

const grid = 8;

const getItemStyle = (isDragging, draggableStyle, color) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: `${grid}px ${grid * 2}px`,
  margin: `0 0 ${grid}px 0`,
  borderRadius: 2,
  position: 'relative',
  width: 132,
  boxSizing: 'border-box',

  // change background colour if dragging
  background: isDragging ? 'lightgrey' : `${color}`,

  // styles we need to apply on draggables
  ...draggableStyle
});

const StyledX = styled.div`
  position: absolute;
  top: 2px;
  right: 8px;
`;

function Card(props) {
  const [showDetail, setShowDetail] = useState(false);

  function handleClick(evt) {
    if(evt.target.innerHTML === ' x '){
      props.triggerDelete(evt.target.getAttribute('id'));
    } else {
      setShowDetail(true);
    }
  }

  function closeDetail() {
    setShowDetail(false);
  }

  const {item, index} = props;
  const {id,
         company,
         position,
         description,
         url,
         location,
         appliedAt,
         phoneScreenAt,
         codeChallengeAt,
         onSiteAt,
         offerAt,
         rejectedAt} = item;
  return(
    <>
      {showDetail && <JobDetail
                        onClick={closeDetail}
                        triggerClose={closeDetail}
                        company={company}
                        position={position}
                        description={description}
                        url={url}
                        location={location}
                        appliedAt={appliedAt}
                        phoneScreen={phoneScreenAt}
                        codeChallengeAt={codeChallengeAt}
                        onSiteAt={onSiteAt}
                        offerAt={offerAt}
                        rejectedAt={rejectedAt}
                      />}
      <Draggable
      key={id}
      draggableId={id}
      index={index}>
        {(provided, snapshot) => (
          <div
          onClick={handleClick}
          id={id}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={getItemStyle(
            snapshot.isDragging,
            provided.draggableProps.style,
            item.color
            )}>
              <StyledX id={id}> x </StyledX>
              <div><b>{company}</b></div>
              <div>{position}</div>
          </div>
        )}
      </Draggable>
    </>
  );
}

export default Card;