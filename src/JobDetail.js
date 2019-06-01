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
  width: 500px;
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
  flex: 1 50%;
  height: 0%;
`;

const BotCol = styled.div`
  flex: 1 100%;
`;

const Row = styled.div`
  width: 100%;
  display: flex;
  text-align: start;
  padding: 0.5rem;
`;

const Title = styled.div`
  width: 40%;
`;

const Content = styled.div`
  width: 60%;
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
          <Row>
            <Title>Location:</Title>
            <Content>{location}</Content>
          </Row>
        </Col>
        <Col>
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
          <Row>Description:</Row>
          <Row>{description}</Row>
        </BotCol>
        <StyledX onClick={handleClick}> x </StyledX>
      </StyledModalContent>
    </StyledModal>
  );
}

export default JobDetail;