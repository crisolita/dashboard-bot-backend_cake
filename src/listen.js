const handleTxPool = require("./handleTxPool");
const setBlocknativeFilters = require("./setBlocknativeFilters");
const url = require("url");

const hre = require("hardhat");
const { ethers } = hre;

const listen = async (req, res) => {
  const { TARGET_TOKEN, MIN_AMOUNT_TO_RECEIVE, AMOUNT_BUSD_TO_USE } = url.parse(
    req.url,
    true
  ).query;
  try {
    const [USER] = await ethers.getSigners();
    console.log("Starting...", USER.address);
    console.log("TARGET TOKEN:", TARGET_TOKEN);
    const emitter = await setBlocknativeFilters(TARGET_TOKEN);
    emitter.on("txPool", (tx) =>
      handleTxPool(
        tx,
        TARGET_TOKEN,
        MIN_AMOUNT_TO_RECEIVE,
        AMOUNT_BUSD_TO_USE,
        req,
        res,
        emitter
      )
    );
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        data: "Hello World!",
      })
    );
    return emitter;
  } catch (error) {
    console.log(error);
    res.end("Hubo un error");
  }
};
module.exports = listen;
