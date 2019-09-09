 window.addEventListener('load', async () => {
     var contract;
     const owner = '0x52E9422c92bD129189AAE28DE2bfc5f566bFc8d6';
     const user1 = '0xFa61EA5c6dD5EE3cbE8fb80903a40eb1dEba40C7';
     const user2 = '0x858Ce395cb791Cb2c87c69368b522F30F60bB073';
     const initContract = async () => {
        const contractAddress = "0x18638b626362d2d56C72803ea1a05D80eefb805e";
        // 0x4a302676A59696e9A2d593f8BA2b887294A36195
        
        const web3 = new Web3();
        web3.setProvider(new web3.providers.HttpProvider("http://localhost:7545"));
        contract = new web3.eth.Contract(abi, contractAddress, {from: owner});


        console.log(Web3.modules)
        console.log('contract: ', contract)
        console.log(await web3.eth.getNodeInfo())
        console.log(await web3.eth.getBlockNumber())
        console.log(await web3.eth.getBalance(owner))
        console.log(await web3.eth.getBlock(1)) 
     }
     
     const contractMessage = async () => {  
         return  await contract.methods.getMyName().call();               
     }


     const getTotalSupply = async () => { 
        return await contract.methods.totalSupply().call();              
     }  

    const getBalanceOf = async (addr) => {
      return await contract.methods.balanceOf(addr).call();
    }
 

    // let btnMint = document.getElementById('btnMint');
    $("#btnMint").click( async () => {
      const amount = $("#inputMint").val(); 
      let result =  contract.methods.mint(owner, amount).send({from: owner});        
      if(result)  console.log('Mint completed!')

      let bal = await getBalanceOf(owner)
      $("#owner1").text(bal) 
    })

    $("#btnBurn").click( async () => {
      const amount = $("#inputBurn").val(); 
      let result =  contract.methods.burn(amount).send({from: owner});        
      if(result)  console.log('Burn completed!')

      let bal = await getBalanceOf(owner)
      $("#owner1").text(bal) 
    })

    $("#btnTransfer").click( async () => {
      const user = $("#inputRecvAccount").val(); 
      const amount = $("#inputTransferAmount").val(); 
      let result =  contract.methods.transfer(user,amount).send({from: owner});        
      if(result)  console.log('Transfer completed!')

      let bal = await getBalanceOf(owner)
      $("#owner1").text(bal) 

      let u1 = await getBalanceOf(user1)
      $("#user1").text(u1) 

      let u2 = await getBalanceOf(user2)
      $("#user2").text(u2) 
    })


    if (window.ethereum) {
         window.web3 = new Web3(ethereum);
         await initContract();

         try { 
             await ethereum.enable(); 
             const balance = await getTotalSupply();
             $("#balance").text(balance) 

 
             let bal = await getBalanceOf(owner)
             $("#owner1").text(bal) 

             bal = await getBalanceOf(user1)
             $("#user1").text(bal) 

              bal = await getBalanceOf(user2)
             $("#user2").text(bal) 


         } catch (error) {
            console.log('error: ',error)
         }
     }
     // Non-dapp browsers
     else {
         console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
     }

 }); 