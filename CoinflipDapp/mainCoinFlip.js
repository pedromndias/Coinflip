var web3 = new Web3(Web3.givenProvider);
// First we create a contract instance:
var contractInstance;

// The next code will execute when the page is loaded:
$(document).ready(function() {
    // After the user enables Metamask, there will be a promise so we can start our code. Metamask will send an array of accounts:
    window.ethereum.enable().then(function(accounts){
      // Then we initialize that instance. Arguments of Contract() are "abi", "address where to send" and "accounts that sends tx":
      contractInstance = new web3.eth.Contract(abi, "0xf496E71734e07Ab508b170282b9398128Cd9EDc5", {from: accounts[0]});
      // console.log it to see what it looks like in the browser:
      console.log(contractInstance);
    });
    // Let's add a click handler to our button "FLIP ETH", with id "flip_coin":
    $("#flip_coin").click(inputEth) // Everytime we click the button it will execute inputEth() function
});

// Let's implement inputEth() function:
function inputEth(){
  // We can test the button with alert("input ETH");
  // Now we create a variable with the value input in our text form:
  var ethAmmount = parseInt($("#eth_ammount").val());
  // Test it with console.log: console.log("Ammount of ETH inserted: " + ethAmmount);

  // Let's create a config for our send() argument:
  var config = {
    value: ethAmmount
  }

  /* Now we can call our function flipCoin() in our contract. The argument will be our new JS variable ethAmmount. We also need
  to tell web3 where to send this tx, running ".send()": */
  contractInstance.methods.flipCoin().send(config);
}
