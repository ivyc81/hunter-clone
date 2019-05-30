import React from 'react'
import styled from 'styled-components';


const StyledModal = styled.div`
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0,0,0);
  background-color: rgba(0,0,0,0.4);
  display: flex;
`;

const StyledModalContent = styled.div`
  position: relative;
  width: 500px;
  margin: auto;
  background-color: #fefefe;
  border: 1px solid #888;
  border-radius: 4px;
  padding: 2rem;
`;

const StyledX = styled.div`
  position: absolute;
  top: 2px;
  right: 8px;
`;

const Row = styled.div`
  width: 100%;
  display: flex;
  text-align: start;
  padding: 0.5rem;
`;

const Title = styled.div`
  width: 20%;
`;

const Content = styled.div`
  width: 70%;
`;

function JobDetail(props) {
  const {triggerClose, company, position, description, url} = props;

  function handleClick(evt){
    triggerClose();
  }

  return(
    <StyledModal>
      <StyledModalContent>
        <Row>
          <Title>Company:</Title>
          <Content>{company}</Content>
        </Row>
        <Row>
        <Title>Position:</Title>
        <Content>{position}</Content>
        </Row>
        <Row>
          <Title>Post Url:</Title>
          <Content>{url}</Content>
        </Row>
        <Row>Description:</Row>
        <Row>{description}</Row>
        <StyledX onClick={handleClick}> x </StyledX>
      </StyledModalContent>
    </StyledModal>
  );
}

export default JobDetail;