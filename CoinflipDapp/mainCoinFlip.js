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
    $("#flip_coin").click(inputEth)
    // Everytime we click the button it will execute inputEth()

    //Let's do the same with depositBalance(), withdrawAll() and getBalance():
    $("#add_funds").click(depositBalance)
    $("#withdraw_funds").click(withdrawAll)
    $("#get_balance").click(getBalance)

});

// Let's implement inputEth() function:
function inputEth(){
  // We can test the button with alert("input ETH");
  // Now we create a variable with the value input in our text form:
  var ethAmount = $("#eth_amount").val();
  // Transform it in wei (do have like 0.1 ETH):
  var amountInWei = web3.utils.toWei(ethAmount, "ether");
  // Test it with console.log:
  console.log("Amount of ETH inserted: " + amountInWei);

  // Let's create a config for our send() argument:
  var config = {
      value: amountInWei,
      gas: 100000
  }
  /* Now we can call our function flipCoin() in our contract. We also need to tell web3 where
  to send this tx, running ".send()". The argument will be our new JS variable ethAmount: */
  contractInstance.methods.flipCoin().send(config)
  .on("transactionHash", function(hash){
    console.log(hash);
  })
  .on("confirmation", function(confirmationNr){
    console.log(confirmationNr);
  })
  .on("receipt", function(receipt){
    console.log(receipt);
    // alert("Coin Flipped!");
    if(receipt.events.result.returnValues === 0){
      $("#game_result").text("Congratulations! " + valueToPlayer + " ETH won");
    }
    else{
      $("#game_result").text("Sorry, you lost! Play again?");
    }
  })
}


function depositBalance(){
  var fundsAmount = $("#funds_amount").val();
  var fundsInWei = web3.utils.toWei(fundsAmount, "ether");
  console.log("Amount of ETH deposited in the contract: " + fundsInWei);
  var config = {
      value: fundsInWei,
      gas: 100000
  }
  contractInstance.methods.depositBalance().send(config)
}

function withdrawAll(){
  contractInstance.methods.withdrawAll().send();
  $("#total_withdrew").text(res.toTransfer);
}

function getBalance(){
  contractInstance.methods.getBalance().call().then(function(res){
    // Let's console.log see the format of the result:
    console.log(res);
    // Now we use jquery to set the value of the result:
    $("#total_balance").text(res.balance);
  })
}
