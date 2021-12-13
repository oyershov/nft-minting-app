# Ugly sweaters

## Installation 🛠️

```

Make sure you have node.js installed so you can use npm, then run:

```sh
npm install
```

## Usage ℹ️

In order to make use of this dapp, all you need to do is change the configurations to point to your smart contract as well as update the images and theme file.

For the most part all the changes will be in the `public` folder.

To link up your existing smart contract, go to the `public/config/config.json` file and update the following fields to fit your smart contract, network and marketplace details. The cost field should be in wei.

Note: this dapp is designed to work with the intended NFT smart contract, that only takes one parameter in the mint function "mintAmount". But you can change that in the App.js file if you need to use a smart contract that takes 2 params.

```json
{
  "CONTRACT_ADDRESS": "0x827acb09a2dc20e39c9aad7f7190d9bc53534192",
  "SCAN_LINK": "https://polygonscan.com/token/0x827acb09a2dc20e39c9aad7f7190d9bc53534192",
  "NETWORK": {
    "NAME": "Polygon",
    "SYMBOL": "Matic",
    "ID": 137,
    "ID_HEX": "0x89"
  },
  "NFT_NAME": "The Stripes NFT",
  "SYMBOL": "TSNFT",
  "MAX_SUPPLY": 992,
  "WEI_COST": 75000000000000000,
  "DISPLAY_COST": 0.075,
  "GAS_LIMIT": 285000,
  "MARKETPLACE": "Opeansea",
  "MARKETPLACE_LINK": "https://opensea.io/collection/the-stripes-nft",
  "ADDRESS_COLLECTING_FORM": "",
  "EVENT_START_DATE": "",
  "EVENT_END_DATE": ""
}
```

Make sure you copy the contract ABI from remix and paste it in the `public/config/abi.json` file.
(follow the youtube video if you struggle with this part).

After all the changes you can run.

```sh
npm run start
```

Or create the build if you are ready to deploy.

```sh
npm run build
```

Now you can host the contents of the build folder on a server.

That's it! you're done.
