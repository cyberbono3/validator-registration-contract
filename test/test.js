
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
        let tx = await instance.methods.deposit(depositParamsBytes).send({from: accounts[random],value: amount})
        //console.log(tx, "tx")
       // console.log(tx.transactionHash, "tx.transactionHash")
        let receiptsTree1 = await instance.methods.getReceiptRoot().call();
        console.log(receiptsTree1, "receiptsTree[1]")

        let receiptsTree2 = await instance.methods.receiptTree(2).call();
        console.log(receiptsTree2, "receiptsTree[2]")

        let receiptsTree3 = await instance.methods.receiptTree(3).call();
        console.log(receiptsTree3, "receiptsTree[3]")


        let receiptsTree4 = await instance.methods.receiptTree(4).call();
        console.log(receiptsTree4, "receiptsTree[4]")

        let receiptsTree5 = await instance.methods.receiptTree(5).call();
        console.log(receiptsTree5, "receiptsTree[5]")
       
        

       
        
       //  let mergeBytes = await instance.methods.mergeBytes(receiptsTree2, receiptsTree3).call();
        // console.log(mergeBytes, "mergeBytes")
        // //let sha3 = web3_1_0.utils.sha3(mergeBytes).call();

        // console.log(receiptsTree2, "receiptsTree[2]")
        // console.log(receiptsTree3, "receiptsTree[3]")
        // console.log(mergeBytes, "mergeBytes")
        //console.log(sha3, "sha3")












       // let tx = await instance.methods.deposit(bytes).send({from: accounts[random],value: amount})
       // console.log(tx, "tx")
        // .on('error', function(error) { console.log(error, "error")})
        // .on('transactionHash', function(transactionHash){ console.log(transactionHash, "transactionHash") })
        // .on('receipt', function(receipt) {
        // console.log(receipt.contractAddress) // contains the new contract address
        // })
      
    });

})
