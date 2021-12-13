import React from 'react';
import { useSelector } from 'react-redux';

const WalletAddressCollecting = () => {
  const { config } = useSelector((state) => state.config);

  return (
    <div>
      <p>Wallet address collecting</p>
      <a target="_blank" href={config.ADDRESS_COLLECTING_FORM}>Yes, I want Matic</a>
    </div>
  )
};

export default WalletAddressCollecting;
