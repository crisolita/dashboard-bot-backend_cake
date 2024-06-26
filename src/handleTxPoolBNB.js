const { fromWei, WBNB, BUSD, abi_busd } = require("./utils");
const hre = require("hardhat");
const unlisten = require("./unlisten");
const { ethers } = hre;
const walletClient = "0xa568890111c0ec5e69a595c462408f5e6e3de08c";

const CAKE_ROUTER = "0x10ED43C718714eb63d5aA57B78B54704E256024E";
const handleTxPoolBNB = async (
  { contractCall: { contractName, methodName, params }, gasPrice, value, hash },
  TARGET_TOKEN,
  MIN_AMOUNT_TO_RECEIVE,
  AMOUNT_BUSD_TO_USE,
  req,
  res,
  emitter
) => {
  const [USER] = await ethers.getSigners();

  const router = await ethers.getContractAt("IRouter02", CAKE_ROUTER, USER);
  const BUSD_CONTRACT = await ethers.getContractAt(
    "BEP20Token",
    "0xe9e7cea3dedca5984780bafc599bd69add087d56",
    USER
  );
  const { timestamp } = await ethers.provider.getBlock();

  console.log("");
  console.log("-----------------------------------");
  console.log(`value`, fromWei(value), "BNB");
  console.log(`contractName`, contractName);
  console.log(`methodName`, methodName);
  console.log(`params`, params);
  console.log(`gasPrice`, gasPrice * 1e-9);
  console.log(`hash`, hash);
  const PATH = [WBNB, TARGET_TOKEN];

  // const MIN_AMOUNT_BNB_LIQUIDITY = MIN_AMOUNT_TO_RECEIVE;
  try {
    if (
      methodName === "addLiquidityETH" &&
      params.token.toUpperCase() === TARGET_TOKEN.toUpperCase()
    ) {
      console.log("Found!", TARGET_TOKEN);

      const dexSwap = await router.functions.swapExactETHForTokens(
        ethers.utils.parseUnits(MIN_AMOUNT_TO_RECEIVE.toString(), "ether"),
        PATH,
        USER.address,
        Number(timestamp) + 350,
        {
          value: ethers.utils
            .parseEther(AMOUNT_BUSD_TO_USE.toString())
            .toString(),
          from: USER.address,
          gasLimit: 30000000,
        }
      );
      const resp = await dexSwap.wait();
      emitter.off("txPool");
      console.log(
        `Transaction confirmed with hash ${
          resp.transactionHash
        }. Gas used: ${String(resp.gasUsed)}`
      );
    }
  } catch (error) {
    console.log(`error`, error);
  }
};
module.exports = handleTxPoolBNB;
