
const {getWeb3, getContractInstance} = require('./helpers');
const web3_1_0 = getWeb3();
const getInstance = getContractInstance(web3_1_0);

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

contract("ValidatorRegistration", async (accounts) => {
    var ValidatorRegistration = getInstance('ValidatorRegistration', accounts[0] );
    const amount = web3_1_0.utils.toWei('32', 'ether');
  



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

        assert.equal(output, concatStr, "addedHexInput and output do not match" )
    });

     //take output arbitrary bytes array  declared in the previous test and 32 ETH
     //receiptTree[index] = abi.encodePacked(keccak256(mergeBytes(receiptTree[index * 2], receiptTree[index * 2 + 1])));
    it("getReceiptRoot()", async() => {
        const instance = await ValidatorRegistration.deploy().send();
         //await instance.methods.deposit(output).call()
        let depositParams  = getRandomInt(0,10**9);
        let depositParamsBytes =  await instance.methods.toBytes(depositParams).call();
        console.log(depositParams , "depositParams ")
        console.log(depositParamsBytes, "depositParamsBytes")

       

       
        let random = getRandomInt(0,9);
        await instance.methods.deposit(depositParamsBytes).send({from: accounts[random],value: amount})
        let output = await instance.methods.getReceiptRoot().call();
        console.log(output, "output")
        let receiptsTree1 = await instance.methods.receiptTree(1).call();
        console.log(receiptsTree1, "receiptsTree[1]")
        assert.equal(receiptsTree1, output, "getReceiptTree() failed") 


        /* @dev
          In order to make comprehensive test of getreceiptTree I intended to compute 
          receiptTree[1] relying on line 56 in validator_registation.sol
          receiptTree[index] = abi.encodePacked(keccak256(mergeBytes(receiptTree[index * 2], receiptTree[index * 2 + 1])));
          It follows, calculatation of receiptTree[1] requires computation of receiptTree[2] and receiptTree[3]
          receiptTree[1] = abi.encodePacked(keccak256(mergeBytes(receiptTree[2], receiptTree[3])));
          Conclusevely, line 55 in validator_registation.sol index = index / 2 results in computation of even receiptTree only
          This, as you can see below i am unable to compute receiptsTree3 and receiptsTree5
        */

        // let receiptsTree3 = await instance.methods.receiptTree(3).call();
        // receiptsTree3 is null



        // let receiptsTree5 = await instance.methods.receiptTree(5).call();
        // receiptsTree5 is null 
       
        

    
    });

})
