import "./Ownable.sol";
pragma solidity 0.5.12;

contract CoinFlip is Ownable{

    event result (uint);

    address public owner;
    uint private balance;
    uint resultOfGame;
    uint valutToPlayer;

    function random() public view returns(uint){
        return now % 2;
    }

    function depositBalance() public payable {
        balance += msg.value;
    }

    function flipCoin() public payable {
        require(balance >= msg.value * 2, "Balance needs to have at least twice as ETH as guest play");
        require(msg.value != 0, "Needs to send positive balance");
        if (now % 2 == 0){
            msg.sender.transfer(msg.value*2);
            balance -= (msg.value*2);
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
