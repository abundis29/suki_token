// Data in Blockchain is inmutable
const SukiToken = artifacts.require("SukiToken");

contract('SukiToken', function(accounts) {

    it('initialize the contract with the correct values', function() {
        return SukiToken.deployed().then(function(instance) {
            tokenInstance = instance;
            return tokenInstance.name();
        })
        .then(function(name) {
            assert.equal(name, 'Suki Token', 'has the correct name');
            return tokenInstance.symbol();
        })
        .then(function(symbol) {
            assert.equal(symbol, 'SUKI', 'has the correct symbol');
            return tokenInstance.standard();
        })
        .then(function(standard) {
            assert.equal(standard, 'Suki Token v1.0', 'has the correct standard');
        })
    });

    it('allocates the initial supply upon deployment', function() {
        return SukiToken.deployed().then(function(instance) {
            tokenInstance = instance;
            return tokenInstance.totalSupply();
        }).then(function(totalSupply) {
            assert.equal(totalSupply.toNumber(), 10000000, 'sets the total supply to 10000000');
            return tokenInstance.balanceOf(accounts[0]);
        }).then(function(adminBalance){
            assert.equal(adminBalance.toNumber(), 10000000, 'it allocats 10000000 to the admin account');
        });
    });


    it('transfers token ownership', function() {
        return SukiToken.deployed().then(function(instance) {
            tokenInstance = instance;
            // .call doesn't call transaction
            return tokenInstance.transfer.call(accounts[1], 99999999999);
        }).then(assert.fail).catch(function(error){
            console.log(error.message, "🏞💽")
            assert(error.message.indexOf('revert') >= 0, 'error message must containt revert')
            return tokenInstance.transfer.call(accounts[1], 2500000, { from: accounts[0] });
        }).then(function(success){
            assert.equal(success, true, 'it returns true');
            return tokenInstance.transfer(accounts[1], 2500000, { from: accounts[0] });
        })
        .then(function(receipt){
            assert.equal(receipt.logs.length, 1, 'triggers one event')
            assert.equal(receipt.logs[0].event, 'Transfer', 'should b the "Tranfer" event')
            assert.equal(receipt.logs[0].args._from, accounts[0], 'logs the account the tokenare transferen from')
            assert.equal(receipt.logs[0].args._to,accounts[1], 'logs th account the tokens are transferred to')
            assert.equal(receipt.logs[0].args._value, 2500000, 'logs the transfer amount')
            return tokenInstance.balanceOf(accounts[1]);
        }).then(function(balance){
            assert.equal(balance.toNumber(), 2500000, 'adds the amount to the receibing chosto')
            return tokenInstance.balanceOf(accounts[0])
        })
        .then(function(balance){
            assert.equal(balance.toNumber(), 7500000, 'deducts from the sending the amount to the receibing chosto')
        })
    });



});