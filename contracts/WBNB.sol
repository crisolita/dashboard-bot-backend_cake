// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import "@openzeppelin/contracts/token/ERC20/presets/ERC20PresetMinterPauser.sol";

/**
 * @title token
 */
contract WBNB is ERC20PresetMinterPauser {
	constructor() ERC20PresetMinterPauser("WRAPPEDBNB", "BNB") {}
}
