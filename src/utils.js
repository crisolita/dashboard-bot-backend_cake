const hre = require("hardhat");
const { ethers } = hre;
exports.BNB = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";
exports.WBNB = "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c";

// exports.getTokenSymbol = (address) => {
//   const _tokens = tokens.filter(
//     (t) => t.address.toLowerCase() === address.toLowerCase()
//   );

//   if (_tokens.length === 1) return _tokens[0].symbol;
// };

// exports.getTokenAddress = (symbol) => {
//   const _tokens = tokens.filter((t) => t.symbol === symbol);

//   if (_tokens.length === 1) return _tokens[0].address;
// };

// exports.formatWei = (symbol, amount) => {
//   const _tokens = tokens.filter((t) => t.symbol === symbol);

//   if (_tokens.length === 1) return amount / 10 ** _tokens[0].decimals;
// };

exports.toWei = (num) => String(ethers.utils.parseEther(String(num)));
exports.fromWei = (num) => Number(ethers.utils.formatEther(num));
exports.toBN = (amt) => {
  ethers.utils.BigNumber.from(String(amt));
};
