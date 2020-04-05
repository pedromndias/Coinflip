import "./Ownable.sol";
pragma solidity 0.5.12;

contract CoinFlip is Ownable{

    event result (uint);

    address public owner;
    uint private balance;

    function random() public view returns(uint){
        return now % 2;
    }

    function depositBalance() public payable {
        balance += msg.value;
    }

    function flipCoin() public payable {
        uint valueToPlayer = msg.value*2;

        require(balance >= valueToPlayer, "Balance needs to have at least twice as ETH as guest play");
        require(msg.value != 0, "Needs to send positive balance");

        uint resultOfGame = now % 2;
        if (resultOfGame == 0){
            msg.sender.transfer(valueToPlayer);
            balance -= (valueToPlayer);
            emit result (0);
        }
        else{
        balance += msg.value;
        emit result (1);
        }
    }

    function getBalance() public view returns (uint) {
        return balance;
    }

    function withdrawAll () public onlyOwner returns(uint) {
        uint toTransfer = balance;
        balance = 0;
        msg.sender.transfer(toTransfer);
        return toTransfer;
    }
}
