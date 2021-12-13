import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import image6 from './assets/images/image6.png';
import EventPhase from "./components/EventPhase";
import Minting from "./components/Minting";
import WalletAddressCollecting from "./components/WalletAddressCollecting";
import { fetchConfig } from "./redux/config/actions";
import { fetchData } from "./redux/contract-data/actions";
import { fetchToken } from "./redux/user-token/actions";

export const StyledMain = styled.div`
`

const StyledImageWrap = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  margin-top: -400px;
  position: absolute;
  width: 100%;
`

const StyledImage = styled.img`
  max-height: 460px;
`

function App() {
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const { config } = useSelector((state) => state.config);
  const { accentureAccessToken } = useSelector((state) => state.token);

  const dateNow = new Date();
  const eventStartDate = new Date(config.EVENT_START_DATE);
  const eventEndDate = new Date(config.EVENT_END_DATE);

  useEffect(() => {
    dispatch(fetchConfig())
    dispatch(fetchToken())
  }, []);

  useEffect(() => {
    if (blockchain.account !== "" && blockchain.smartContract !== null) {
      dispatch(fetchData(blockchain.account));
    }
  }, [blockchain.account]);

  // ONLY FOR DEVELOPMENT - START
  useEffect(() => {
    if (!accentureAccessToken) {
      sessionStorage.setItem('accentureAccessToken', 'dummy-token')
    }
  }, []);
  // ONLY FOR DEVELOPMENT - END

  useEffect(() => {
    if (accentureAccessToken === 'no-token') {
      window.location.href = "/xmas-login";
    }
  }, [accentureAccessToken]);

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
      {currentEventPhase === 1 && (
        <WalletAddressCollecting />
      )}
      {currentEventPhase === 2 && (
        <Minting />
      )}
      {currentEventPhase === 3 && (
        <a target="_blank" href={config.MARKETPLACE_LINK}>
          Check the collection at {config.MARKETPLACE}
        </a>
      )}
      <StyledImageWrap>
        <StyledImage src={image6} alt="Ball" />
      </StyledImageWrap>
      <p>How to</p>
      <p>Q&A</p>
      <p>Team</p>
      <p>Footer</p>
    </StyledMain>
  );
}

export default App;
