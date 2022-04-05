const { fromWei, WBNB, BUSD, abi_busd } = require("./utils");
const hre = require("hardhat");
const { default: userEvent } = require("@testing-library/user-event");
const { ethers } = hre;
const walletClient = process.env.WALLETCLIENT;

const CAKE_ROUTER = "0x10ED43C718714eb63d5aA57B78B54704E256024E";
const handleTxPool = async () => {
  const [USER] = await ethers.getSigners();
  const TARGET_TOKEN = "0x55d398326f99059fF775485246999027B3197955";
  let router = await ethers.getContractAt("IRouter02", CAKE_ROUTER, USER);
  let BUSD_CONTRACT = await ethers.getContractAt(
    "BEP20Token",
    "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
    USER
  );
  const { timestamp } = await ethers.provider.getBlock();
  const PATH = [BUSD, TARGET_TOKEN];
  const MIN_AMOUNT_TO_RECEIVE = ethers.utils.parseUnits("1", "ether");
  const AMOUNT_BUSD_TO_USE = ethers.utils.parseUnits("3", "ether");

  try {
    console.log("Holsaaa");
    const balance = await BUSD_CONTRACT.functions.approve(
      router.address,
      AMOUNT_BUSD_TO_USE,
      { from: USER.address, gasLimit: 300000 }
    );
    console.log(balance);
  } catch (error) {
    console.log(`error`, error);
  }
};
handleTxPool();
module.exports = handleTxPool;
