const SukiToken = artifacts.require("SukiToken");

module.exports = function(deployer) {
  deployer.deploy(SukiToken);
};
