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
  color: 'white',

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

const StyledTitle = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const StyledPosition = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 0.7rem;
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
  const {color,
         id,
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
            color
            )}>
              <StyledX id={id}> x </StyledX>
              <StyledTitle>{company}</StyledTitle>
              <StyledPosition>{position}</StyledPosition>
          </div>
        )}
      </Draggable>
    </>
  );
}

export default Card;