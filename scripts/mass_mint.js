// Wallet.ride deploy script. To run execute `surfboard run path/to/script`

// wrap out script with async function to use fancy async/await syntax
(async () => {
    // Functions, available in tests, also available here
    const script = compile(file('madpunks.ride'));

    // You can set env varibles via cli arguments. E.g.: `surfboard run path/to/script  --variables 'dappSeed=seed phrase,secondVariable=200'`
    // const dappSeed = env.dappSeed;
    const dappSeed = env.SEED; // Or use seed phrase from surfboard.config.json
    if (dappSeed == null){
        throw new Error(`Please provide dappSedd`)
    }
    for (let index = 0; index < 3; index++) {
        var dropTx = invokeScript({
            fee: 900000, 
            dApp: "3MugHf1wRTdGuTrjXGB4qunDNZ6jNEVEAdu",
            call: {
                function: "mint",
                args: []
            }
        }, dappSeed)
        await broadcast(dropTx);
        await waitForTx(dropTx.id);
        console.log("Empire #" + (index).toString())

        


        // var dropTx = invokeScript({
        //     fee: 900000, 
        //     dApp: "3NBnH6Dmj3qoU6dc3kTRJ73mpPeuLg3f1WV",
        //     call: {
        //         function: "mint",
        //         args: []
        //     }
        // }, dappSeed)
        // await broadcast(dropTx);
        // // await waitForTx(dropTx.id);
        // console.log("Mutation #" + (index).toString())
        // // await waitNBlocks(1)

        // var dropTx = invokeScript({
        //     fee: 900000, 
        //     dApp: "3Muey1cqNaBjjcxXfKHF8qqTZeyGPAsvCpP",
        //     call: {
        //         function: "mint",
        //         args: []
        //     }
        // }, dappSeed)
        // await broadcast(dropTx);
        // // await waitForTx(dropTx.id);
        // console.log("Free nomads #" + (index).toString())
    }    

})();
