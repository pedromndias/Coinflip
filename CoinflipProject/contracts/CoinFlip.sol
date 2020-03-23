import "./Ownable.sol";
pragma solidity 0.5.12;

contract CoinFlip is Ownable{

    // Let's create an event everytime someone "flips a coin", giving us his address:
    event coinFlipped(address);
    // And an event with how much was paid to the player:
    event ammountPaidToPlayer(uint);

    address public owner;

    uint private balance;

    // Variable for the result of the game:
    uint resultOfGame;

    // Variable for the ammount paid to the player:
    uint valueToPlayer;

    // Function with some pseudo randomness, given by Filip:
    function random() public view returns(uint){
        return now % 2;
    }

    // Let's create a function that flips the coin. It has to be payable.
    function flipCoin() public payable returns(uint){

        address payable player = msg.sender;

        // It should cost more than 0 ether:
        require(msg.value != 0, "Needs to send positive balance");

        // ethAmmount should be the value sent by the user:
        uint ethAmmount = msg.value;

        // The result of random() can either be 0 or 1. If it is 0 we send the funds (double) to the player. If it is 1, we keep it:
        if (now % 2 == 0){
            // send to the player:
            valueToPlayer = 2*ethAmmount;
            player.transfer(valueToPlayer);
            resultOfGame = valueToPlayer;
        }
        else{
        // keep the funds and update the balance:
        balance += msg.value;
        resultOfGame = 0;
        }

        // Here we can sent out the event when someone uses the app:
        emit coinFlipped(msg.sender); // This is who called the function
        // Here we can sent out the event with the ammount paid to the player:
        if (resultOfGame != 0) emit ammountPaidToPlayer(valueToPlayer);
    }

    // Let's write a function to send the data to the browser:
    function getResultOfGame() public view returns (uint){
        return resultOfGame;
    }

    // Let's write a function that gets the balance of an address:
    function getBalance() public view onlyOwner returns (uint) {
        return balance;
    }

    // Let's create a function to withdraw all the funds, but only the owner!
    function withdrawAll () public onlyOwner returns(uint) {
        uint toTransfer = balance;
        balance = 0;
        msg.sender.transfer(toTransfer);
        return toTransfer;
    }
}
