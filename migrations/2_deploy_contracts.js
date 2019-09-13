const SukiToken = artifacts.require("SukiToken");

module.exports = function(deployer) {
  deployer.deploy(SukiToken, 10000000);
};
