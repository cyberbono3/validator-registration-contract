
const {getWeb3, getContractInstance} = require('./helpers');
const web3_1_0 = getWeb3();
const getInstance = getContractInstance(web3_1_0);

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

contract("ValidatorRegistrationTest", async (accounts) => {
    var ValidatorRegistration = getInstance('ValidatorRegistrationTest', accounts[0] );

    
    it("toBytes()", async() => {
        const instance = await ValidatorRegistration.deploy().send();
        let input = getRandomInt(0,10**9)
        let hexInput = web3_1_0.utils.toHex(input)
        let paddedHexInput = web3_1_0.utils.padLeft(hexInput, 64 );
        let output = await instance.methods.toBytes(input).call();
        
        console.log(output,"output" )
        console.log(hexInput,"hexInput" )
        console.log(paddedHexInput,"paddedHexInput" )

        assert.equal(output, paddedHexInput, "addedHexInput and output are not equal" )
        
    })

    it("mergeBytes(bytes memory a, bytes memory b )", async() => {
        const instance = await ValidatorRegistration.deploy().send();
        let input1 = getRandomInt(0,10**9);
        let input2 = getRandomInt(0,10**9);
        let arg1 = web3_1_0.utils.padLeft(web3_1_0.utils.toHex(input1), 64 )
        let arg2 = web3_1_0.utils.padLeft(web3_1_0.utils.toHex(input2), 64 )
        let concatStr = arg1.toString() + arg2.toString().substring(2)
        let output = await instance.methods.mergeBytes(arg1, arg2).call();
        
        console.log(arg1, "arg1")
        console.log(arg2, "arg2")
        console.log(output, "output")
        console.log(concatStr, "concat")

        assert.equal(output, concatStr, "addedHexInput and output are not equal" )


    });

    



    



    

   //https://ethereum.stackexchange.com/questions/26605/uint-to-bytes32-conversion-how-does-this-make-sense

    //  describe("toBytes", async() => {
    //     //input data
    //     let Data = 566
    //     let result;
    //     const instance = await ValidatorRegistration.deploy().send();

    //     before(async() => {
    //     result = await instance.methods.toBytes(Data).call();
        
    //     })

    //     it('should return bytes', async () => {
    //         console.log(result, "result")
    //         consolel

    //     });
    // })
})
