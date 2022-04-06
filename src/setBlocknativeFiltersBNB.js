const sdkSetup = require("./sdk-setup");
const BlocknativeSdk = require("bnc-sdk"); // https://docs.blocknative.com/notify-sdk
const CAKE_ROUTER = "0x10ED43C718714eb63d5aA57B78B54704E256024E";
const { cakeAbi } = require("./abis");
const WebSocket = require("ws");

// create options object
const options = {
  dappId: process.env.DAPP_ID,
  networkId: 56,
  system: "ethereum",
  ws: WebSocket, // only neccessary in server environments
};
const setBlocknativeFiltersBNB = async (TARGET_TOKEN) => {
  let config = [
    {
      name: "global",
      id: "global",
      filters: [
        {
          status: "pending", // do not include pending internal transactions
        },
      ],
      type: "global",
    },
    {
      name: "CAKE Listener",
      id: CAKE_ROUTER,
      filters: [
        { "contractCall.methodName": "addLiquidityETH" },
        {
          "contractCall.params.token": `${TARGET_TOKEN}`,
        },
      ],
      abi: cakeAbi,
      type: "account",
    },
  ];
  const blocknative = new BlocknativeSdk(options);
  await sdkSetup(blocknative, config);
  const { emitter } = blocknative.account(CAKE_ROUTER);
  return emitter;
};
module.exports = setBlocknativeFiltersBNB;
