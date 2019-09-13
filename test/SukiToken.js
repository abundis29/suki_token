// Data in Blockchain is inmutable
const SukiToken = artifacts.require("SukiToken");

contract('SukiToken', function(accounts) {

    it('set the total supply upon deployment', function() {
        return SukiToken.deployed().then(function(instance) {
            tokenInstance = instance;
            return tokenInstance.totalSupply();
        }).then(function(totalSupply) {
            assert.equal(totalSupply.toNumber(), 10000000, 'sets the total supply to 10000000');
        });
    });

});