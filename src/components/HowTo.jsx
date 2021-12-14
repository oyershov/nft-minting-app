import React from 'react';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-end;
  padding:  200px 123px;
  position: relative;
  width: 100%;
  z-index: 1;
`

const StyledContainer = styled.div`
  max-width: 817px;
`


const HowTo = () => {
  return (
    <StyledWrapper>
      <StyledContainer>
        <p className="s2-text--variant-1 s2-text--light">How to get your own Ugly Sweater lorem ipsum?</p>
        <p className="s2-text--variant-2 s2-text--light">We know getting into Web3 comes with a learning curve that isn’t always fun. But who are we to not take up the challenge! To make all this easier for you we have created the following guide to help you redeem your own Ugly Sweater.</p>
      </StyledContainer>
    </StyledWrapper>
  )
};

export default HowTo;
