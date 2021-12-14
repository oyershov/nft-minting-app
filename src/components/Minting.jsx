import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from 'styled-components';
import sweater from '../assets/images/sweater.png';
import { connect } from "../redux/blockchain/actions";
import { fetchData } from "../redux/contract-data/actions";
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

const StyledInfo = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: baseline;
`

const StyledImage = styled.img`
  max-width: 100%;
`

const StyledPrimaryLink = styled.a`
  align-items: center;
  background: #00F436;
  border-radius: 100px;
  border: none;
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
  margin-bottom: 20px;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  width: 100%;
`

const StyledPrimaryButton = styled.button`
  align-items: center;
  background: #00F436;
  border-radius: 100px;
  border: none;
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
  margin-bottom: 20px;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  width: 100%;
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

const StyledErrorMessage = styled.span`
  color: #FF5B51;
  font-family: 'SuisseIntl';
  font-size: 25px;
  font-style: normal;
  font-weight: normal;
  line-height: 32px;
  margin-top: 20px;
  text-align: left;
  width: 100%;
`

const StyledSuccessMessage = styled.span`
  color: #368E4F;
  font-family: 'SuisseIntl';
  font-size: 25px;
  font-style: normal;
  font-weight: normal;
  line-height: 32px;
  margin-top: 20px;
  text-align: left;
  width: 100%;
`

const Minting = () => {
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const {config} = useSelector((state) => state.config);
  const data = useSelector((state) => state.data);
  const [claimingNft, setClaimingNft] = useState(false);
  const [status, setStatus] = useState(`Click buy to mint your NFT.`);

  const claimNFTs = () => {
    let gasLimit = config.GAS_LIMIT;
    let totalCostWei = String(0);
    let totalGasLimit = String(gasLimit);
    console.log("Cost: ", totalCostWei);
    console.log("Gas limit: ", totalGasLimit);
    setStatus(`Minting your ${config.NFT_NAME}...`);
    setClaimingNft(true);
    blockchain.smartContract.methods
      .mint()
      .send({
        gasLimit: String(totalGasLimit),
        to: config.CONTRACT_ADDRESS,
        from: blockchain.account,
        value: totalCostWei,
      })
      .once("error", (err) => {
        console.log(err);
        if (err?.message) {
          setStatus(err.message);
        } else {
          setStatus("Sorry, something went wrong please try again later.");
        }
        setClaimingNft(false);
      })
      .then((receipt) => {
        console.log(receipt);
        setStatus('success');
        setClaimingNft(false);
        dispatch(fetchData(blockchain.account));
      });
  };

  const getData = () => {
    if (blockchain.account !== "" && blockchain.smartContract !== null) {
      dispatch(fetchData(blockchain.account));
    }
  };

  return (
    <StyledWrapper>
      <StyledContainer>
        <Timer currentEventPhase={2} />
        <StyledInfo>
          <div>
            <span className="s2-text--variant-2">{data.totalSupply}</span>
            <span className="s2-text--variant-2">/</span>
            <span className="s2-text--variant-2">{config.MAX_SUPPLY}</span>
          </div>
          <span className="s2-text--variant-2">Minted sweaters</span>
        </StyledInfo>
        <StyledImage src={sweater} alt="Sweater" />
        {status === 'success' && (
          <StyledPrimaryLink
            target="_blank"
            href={`${config.MARKETPLACE_ITEMS_LINK}/${+data.totalSupply + 1}`}
          >
            → check out your sweater
          </StyledPrimaryLink>
        )}
        {blockchain.account && blockchain.smartContract && status !== 'success' && (
          <StyledPrimaryButton
            disabled={claimingNft}
            onClick={(e) => {
              e.preventDefault();
              claimNFTs();
            }}
          >
            {claimingNft ? 'MINTING...' : 'MINT'}
          </StyledPrimaryButton>
        )}
        {!(blockchain.account && blockchain.smartContract) && status !== 'success' && (
          <StyledPrimaryButton
            onClick={(e) => {
              e.preventDefault();
              dispatch(connect());
              getData();
            }}
          >
            → connect to wallet
          </StyledPrimaryButton>
        )}
        <StyledSecondaryLink target="_blank" href={config.MARKETPLACE_LINK}>→ check the collection</StyledSecondaryLink> 
        {blockchain.errorMsg !== "" ? (
          <StyledErrorMessage>{blockchain.errorMsg}</StyledErrorMessage>
        ) : null}
        {status === "success" ? (
          <StyledSuccessMessage>Congrats! You just minted your sweater!</StyledSuccessMessage>
        ) : null}
      </StyledContainer>
    </StyledWrapper>
  )
};

export default Minting;
