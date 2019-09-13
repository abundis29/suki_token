pragma solidity >=0.4.21 <0.6.0;

contract SukiToken {
    // Constructor
    // Set the total numbers of tokens
    // Read the total numbers of tokens

    uint256 public totalSupply;

    constructor() public {
        totalSupply = 10000000;
        // totalSupply comes from the ec20 standart
    }


}