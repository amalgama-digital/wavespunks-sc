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
    const ssTx = setScript({
        script,
        additionalFee: 400000 // Uncomment to raise fee in case of redeployment
    }, dappSeed);
    await broadcast(ssTx);
    await waitForTx(ssTx.id);
    console.log(ssTx.id);

    // const ownerTx = data({
    //     data: [{
    //         type: 'string',
    //         key: 'owner',
    //         value: address(dappSeed),
    //     }],
    //     fee: 1000000,
    // }, dappSeed);
    // await broadcast(ownerTx);
    // await waitForTx(ownerTx.id)
    // console.log('owner was added')

    // const dataTx = data({
    //     data: [{
    //         type: 'integer',
    //         key: 'memalien_supply',
    //         value: 0,
    //     }],
    //     fee: 1000000,
    // }, dappSeed);
    // await broadcast(dataTx);
    // await waitForTx(dataTx.id)
    // console.log('total supply was added')

    // const dataEndTx = data({
    //     data: [{
    //         type: 'integer',
    //         key: 'end_drop',
    //         value: 5,
    //     }],
    //     fee: 1000000,
    // }, dappSeed);
    // await broadcast(dataEndTx);
    // await waitForTx(dataEndTx.id)
    // console.log('End Drop was added')
})();
