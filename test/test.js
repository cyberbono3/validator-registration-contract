var ValidatorRegistrationTest = artifacts.require("./ValidatorRegistrationTest.sol");

contract('ValidatorRegistrationTest', function (accounts) {
   
    let validatorContract;
    let owner = accounts[0];
    const DEPOSIT_SIZE = 32e+18;
    

    before(async() => {
    validatorContract = await ValidatorRegistrationTest.new({ from: owner });
    })

    //https://ethereum.stackexchange.com/questions/26605/uint-to-bytes32-conversion-how-does-this-make-sense

    describe("toBytes", async() => {
        //input data
        let Data = 566
        let hexData;

        before(async() => {
        result = await validatorContract.toBytes.call(Data, { from: owner });
        hexData  = web3.toHex(Data)
        })

        it('should return bytes', async () => {
            console.log(result, "result")
            console.log(hexData, "hexData")
            assert.equal(result, hexData)
            
        });
    })
})
