import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Timer from './Timer';

const StyledWrapper = styled.div`
  background: #000;
  padding 200px 0;
`

const StyledContainer = styled.div`
  align-items: center;
  background: #fff;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  max-width: 990px;
  margin: 0 5vw;
  padding: 165px 86px 271px 86px;
`

const StyledSubmitLink = styled.a`
  align-items: center;
  background: #00F436;
  border-radius: 100px;
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
  margin-top: 100px;
  margin-bottom: 80px;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  width: 100%;
`

const StyledInfoLink = styled.a`
  color: #000;
  cursor: pointer;
  font-family: 'SuisseIntl';
  font-size: 35px;
  font-style: normal;
  font-weight: normal;
  line-height: 47px;
  text-align: left;
  width: 100%;
`

const WalletAddressCollecting = () => {
  const { config } = useSelector((state) => state.config);

  return (
    <StyledWrapper>
      <StyledContainer>
        <Timer />
        <p className="s2-text--variant-1">Send your wallet address to get it for free or pay the gas fees by yourself.</p>
        <p className="s2-text--variant-2">To make sure it is and remains a gift, we will send some cryptocyrency (Matic) to your wallet in advance. To do so we need the address of your wallet. But not worry: the addresses are anonymous and we delete them immediately after the transfer of the cryptocurrency.</p>
        <StyledSubmitLink target="_blank" href={config.ADDRESS_COLLECTING_FORM}>Yes, I want Matic →</StyledSubmitLink>
        <StyledInfoLink target="_blank" href="#">Where can I find my address?</StyledInfoLink>
        <StyledInfoLink target="_blank" href="#">How to install MetaMask wallet?</StyledInfoLink>
        <StyledInfoLink target="_blank" href="#">(Download MetaMask for Firefox)</StyledInfoLink>
      </StyledContainer>
    </StyledWrapper>
  )
};

export default WalletAddressCollecting;
