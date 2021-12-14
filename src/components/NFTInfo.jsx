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


const NFTInfo = () => {
  return (
    <StyledWrapper>
      <StyledContainer>
        <p className="s2-text--variant-1 s2-text--light">Ugly Sweaters is a collection of 700 NFTs living on the Polygon blockchain. </p>
        <p className="s2-text--variant-2 s2-text--light">The initial project is designed to get every Sinner Schrader employee their own and unique Ugly Sweater as a NFT.  The initial project is designed to get every Sinner Schrader employee their own and unique Ugly Sweater as a NFT.</p>
      </StyledContainer>
    </StyledWrapper>
  )
};

export default NFTInfo;
