pragma solidity >=0.4.21 <0.6.0;
// import "./ConvertLib.sol";


contract SukiToken {
    // Constructor
    // Set the total numbers of tokens
    // Read the total numbers of tokens

    string public name = 'Suki Token';
    string public symbol = 'SUKI';
    string public standard = 'Suki Token v1.0';


    uint256 public totalSupply;

    event Transfer(address indexed _from, address indexed _to, uint256 _value);


    mapping (address => uint256) public balanceOf;

    constructor(uint256 _initalSupply) public {
        totalSupply = _initalSupply;
        balanceOf[msg.sender] = _initalSupply;

        // totalSupply comes from the ec20 standart
        // allocate the inital supply

    }

    // Transfer
    function transfer(address _to, uint256 _value) public returns (bool success) {
        // Exeption if account doesn't have enught
        require(balanceOf[msg.sender] >= _value);
        // if(balanceOf[msg.sender] < _value) return false;
        // transfer the balance
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;
        emit Transfer(msg.sender, _to, _value);
        return true;

        // return bool
        // Trsfer Event

    }

    // function getBalanceInEth(address addr) public view returns(uint256){
    //     return ConvertLib.convert(getBalance(addr),2);
    // }



}