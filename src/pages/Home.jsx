import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import ball from '../assets/images/ball.png';
import EventPhase from "../components/EventPhase";
import HowTo from "../components/HowTo";
import Minting from "../components/Minting";
import MintingResults from "../components/MintingResults";
import NFTInfo from "../components/NFTInfo";
import WalletAddressCollecting from "../components/WalletAddressCollecting";
import { fetchConfig } from "../redux/config/actions";
import { fetchData } from "../redux/contract-data/actions";

export const StyledMain = styled.div`
  background: #000;
  color: #fff;
`

const StyledImageWrap = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  margin-top: -400px;
  position: absolute;
  width: 100%;
  z-index: 0;
`

const StyledImage = styled.img`
  max-width: 100%;
`

function Home() {
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const { config } = useSelector((state) => state.config);

  const dateNow = new Date();
  const eventStartDate = new Date(config.EVENT_START_DATE);
  const eventEndDate = new Date(config.EVENT_END_DATE);

  useEffect(() => {
    dispatch(fetchConfig())
  }, []);

  useEffect(() => {
    if (blockchain.account !== "" && blockchain.smartContract !== null) {
      dispatch(fetchData(blockchain.account));
    }
  }, [blockchain.account]);

  const getCurrentEventPhase = () => {
    if (dateNow < eventStartDate) {
      return 1
    } else if (dateNow > eventEndDate) {
      return 3
    } else {
      return 2
    }
  }

  const currentEventPhase = getCurrentEventPhase();

  return (
    <StyledMain>
      <h1>Welcome to the S2 Ugly Sweater NFT Collection</h1>
      <p>Introduction</p>
      <EventPhase currentEventPhase={currentEventPhase}/>
      <NFTInfo />
      {currentEventPhase === 1 && (
        <WalletAddressCollecting />
      )}
      {currentEventPhase === 2 && (
        <Minting />
      )}
      {currentEventPhase === 3 && (
        <MintingResults />
      )}
      <StyledImageWrap>
        <StyledImage src={ball} alt="Ball" />
      </StyledImageWrap>
      <HowTo />
      <p>Q&A</p>
      <p>Team</p>
      <p>Footer</p>
    </StyledMain>
  );
}

export default Home;
