import React from "react";
import { useSelector } from "react-redux";
import styled from 'styled-components';
import sweater2 from '../assets/images/sweater2.png';
import Timer from './Timer';

const StyledWrapper = styled.div`
  align-items: center;
  background: #000;
  display: flex;
  justify-content: center;
  padding 200px 0;
`

const StyledContainer = styled.div`
  align-items: center;
  background: #fff;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin: 0 5vw;
  max-width: 990px;
  padding: 200px 86px 271px 86px;
  width: 100%;
`

const StyledImage = styled.img`
  max-width: 100%;
  margin-bottom: 70px;
`

const StyledSecondaryLink = styled.a`
  align-items: center;
  background: transparent;
  border-radius: 100px;
  border: 1px solid #000;
  color: #000000;
  cursor: pointer;
  display: flex;
  font-family: 'SuisseIntl';
  font-size: 25px;
  font-style: normal;
  font-weight: bold;
  height: 90px;
  justify-content: center;
  letter-spacing: 0.05em;
  line-height: 32px;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  width: 100%;
`

const MintingResults = () => {
  const {config} = useSelector((state) => state.config);

  return (
    <StyledWrapper>
      <StyledContainer>
        <Timer currentEventPhase={3} />
        <StyledImage src={sweater2} alt="Sweater" />
        <StyledSecondaryLink target="_blank" href={config.MARKETPLACE_LINK}>→ check the collection</StyledSecondaryLink> 
      </StyledContainer>
    </StyledWrapper>
  )
};

export default MintingResults;
