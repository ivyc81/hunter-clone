import React from 'react'
import styled from 'styled-components';


const StyledDiv = styled.div`
  position: absolute;
  margin: auto;
  top: 2px;
  right: 4px;
  width: 50px;
  height: 50px;
  background-color: yellow;
  z-index: 1;
`;

function JobDetail(props) {
  const {triggerClose, company, position, description, url} = props;

  function handleClick(evt){
    triggerClose();
  }

  return(
    <StyledDiv>
      <div>{company}</div>
      <div>{position}</div>
      <div>{description}</div>
      <div>{url}</div>
      <div onClick={handleClick}>x</div>
    </StyledDiv>
  );
}

export default JobDetail;