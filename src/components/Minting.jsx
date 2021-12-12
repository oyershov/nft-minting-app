import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "../redux/blockchain/actions";
import { fetchData } from "../redux/contract-data/actions";

const truncate = (input, len) =>
  input.length > len ? `${input.substring(0, len)}...` : input;

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
        setStatus("Sorry, something went wrong please try again later.");
        setClaimingNft(false);
      })
      .then((receipt) => {
        console.log(receipt);
        setStatus(
          `WOW, the ${config.NFT_NAME} is yours! go visit Opensea.io to view it.`
        );
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
    <div>
      <div>
        <div>
          <span>Minted sweaters: </span>
          <span>{data.totalSupply}</span>
        </div>
        <div>
          <span>Maximum possible sweaters to mint: </span>
          <span>{config.MAX_SUPPLY}</span>
        </div>
      </div>
      <div>
        <a target="_blank" href={config.SCAN_LINK}>
          {truncate(config.CONTRACT_ADDRESS, 15)}
        </a>
      </div>
      {blockchain.account === "" || blockchain.smartContract === null ? (
        <div>
          <p>Connect to the {config.NETWORK.NAME} network</p>
          <button
            onClick={(e) => {
              e.preventDefault();
              dispatch(connect());
              getData();
            }}
          >
            Connect
          </button>
          {blockchain.errorMsg !== "" ? (
            <span>{blockchain.errorMsg}</span>
          ) : null}
        </div>
      ) : (
        <div>
          <p>Status: {status}</p>
          <button
            disabled={claimingNft}
            onClick={(e) => {
              e.preventDefault();
              claimNFTs();
              getData();
            }}
          >
            {claimingNft ? 'BUSY' : 'MINT'}
          </button>
        </div>
      )}
    </div>
  )
};

export default Minting;
