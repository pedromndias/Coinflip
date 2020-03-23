const CoinFlip = artifacts.require("CoinFlip");
const truffleAssert = require("truffle-assertions");

contract("CoinFlip", async function(accounts){

  let instance;

  before(async function(){
    instance = await CoinFlip.deployed();
  });


  it("should not allow zero or negative eth sent", async function(){
    await truffleAssert.fails(instance.coinFlipped({value: 0}), truffleAssert.ErrorType.REVERT);
  });
});
