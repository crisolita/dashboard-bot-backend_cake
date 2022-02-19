const { fromWei, WBNB } = require("./utils");
const hre = require("hardhat");
const { ethers } = hre;
const walletClient = "0x155891eE42B987cf428eE27F940cD67E68740494";

const CAKE_ROUTER = "0x10ED43C718714eb63d5aA57B78B54704E256024E";
const handleTxPool = async (
  { contractCall: { contractName, methodName, params }, gasPrice, value, hash },
  TARGET_TOKEN,
  MIN_AMOUNT_TO_RECEIVE,
  AMOUNT_BNB_TO_USE
) => {
  const [USER] = await ethers.getSigners();

  const router = await ethers.getContractAt("IRouter02", CAKE_ROUTER, USER);
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

  const MIN_AMOUNT_BNB_LIQUIDITY = 50 * MIN_AMOUNT_TO_RECEIVE;
  try {
    if (
      methodName === "addLiquidityETH" &&
      params.token.toUpperCase() === TARGET_TOKEN.toUpperCase()
    ) {
      // if enough BNB liquidity added
      if (fromWei(value) > MIN_AMOUNT_BNB_LIQUIDITY) {
      }
      console.log("Found!", TARGET_TOKEN);
      const tx = await router.swapExactETHForTokens(
        ethers.utils.parseEther(MIN_AMOUNT_TO_RECEIVE.toString()).toString(),
        PATH,
        walletClient,
        Number(timestamp) + 350,
        {
          value: ethers.utils
            .parseEther(AMOUNT_BNB_TO_USE.toString())
            .toString(),
        }
      );
      const res = await tx.wait();
      console.log(
        `Transaction confirmed with hash ${
          res.transactionHash
        }. Gas used: ${String(res.gasUsed)}`
      );
    }

    if (
      methodName === "addLiquidity" &&
      (params.tokenA.toUpperCase() === TARGET_TOKEN.toUpperCase() ||
        params.tokenB.toUpperCase() === TARGET_TOKEN.toUpperCase())
    ) {
      let amountBNB;
      if (params.tokenA === WBNB) amountBNB = params.amountADesired;
      else amountBNB = params.amountBDesired;
      console.log("Found!", TARGET_TOKEN);

      const dexSwap = await router.swapExactETHForTokens(
        ethers.utils.parseEther(MIN_AMOUNT_TO_RECEIVE.toString()).toString(),
        PATH,
        walletClient,
        Number(timestamp) + 350,
        {
          value: ethers.utils.parseEther(AMOUNT_BNB_TO_USE).toString(),
        }
      );
      const res = await dexSwap.wait();
      console.log(
        `Transaction confirmed with hash ${
          res.transactionHash
        }. Gas used: ${String(res.gasUsed)}`
      );

      // if enough WBNB liquidity added
      if (fromWei(amountBNB) > MIN_AMOUNT_BNB_LIQUIDITY) {
      }
    }
  } catch (error) {
    console.log(`error`, error);
  }
};
module.exports = handleTxPool;
