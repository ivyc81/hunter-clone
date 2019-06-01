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
  display: flex;
  flex-wrap: wrap;
  position: relative;
  width: 600px;
  margin: 30px auto;
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

const Col = styled.div`
  max-width: 50%;
  flex: 1 50%;
`;

const BotCol = styled.div`
  flex: 1 100%;
`;

const Row = styled.div`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  text-align: start;
  padding: 0.5rem;
`;

const Title = styled.div`
  width: 40%;
  font-size: 0.9rem;
`;

const Content = styled.div`
  width: 60%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  :hover {
    overflow: unset;
    text-overflow: unset;
  }
`;

const DescriptionBox = styled.div`
  overflow: auto;
  height: 350px;
`;

function JobDetail(props) {
  const {triggerClose,
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
         rejectedAt} = props;
  function handleClick(evt){
    triggerClose();
  }

  return(
    <StyledModal>
      <StyledModalContent>
        <Col>
          <Row><b>General Info</b></Row>
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
            <Content><a href={url}>{url}</a></Content>
          </Row>
          <Row>
            <Title>Location:</Title>
            <Content>{location}</Content>
          </Row>
        </Col>
        <Col>
          <Row><b>Dates</b></Row>
          <Row>
            <Title>Applied:</Title>
            <Content>{appliedAt}</Content>
          </Row>
          <Row>
          <Title>Phone Screen:</Title>
          <Content>{phoneScreenAt}</Content>
          </Row>
          <Row>
            <Title>Code Challenge:</Title>
            <Content>{codeChallengeAt}</Content>
          </Row>
          <Row>
            <Title>On Site:</Title>
            <Content>{onSiteAt}</Content>
          </Row>
          <Row>
            <Title>Offer:</Title>
            <Content>{offerAt}</Content>
          </Row>
          <Row>
            <Title>Rejected:</Title>
            <Content>{rejectedAt}</Content>
          </Row>
        </Col>
        <BotCol>
          <Row><b>Description:</b></Row>
          <Row><DescriptionBox>{description}</DescriptionBox></Row>
        </BotCol>
        <StyledX onClick={handleClick}> x </StyledX>
      </StyledModalContent>
    </StyledModal>
  );
}

export default JobDetail;