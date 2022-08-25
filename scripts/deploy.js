// Wallet.ride deploy script. To run execute `surfboard run path/to/script`

// wrap out script with async function to use fancy async/await syntax
(async () => {
    // Functions, available in tests, also available here
    const script = compile(file('madpunks.ride'));

    // You can set env varibles via cli arguments. E.g.: `surfboard run path/to/script  --variables 'dappSeed=seed phrase,secondVariable=200'`
    // const dappSeed = env.dappSeed;
    const dappSeed = env.SEED; // Or use seed phrase from surfboard.config.json
    const dappSeed1 = ""; // Or use seed phrase from surfboard.config.json
    const dappSeed2 = ""; // Or use seed phrase from surfboard.config.json
    const dappSeed3 = ""; // Or use seed phrase from surfboard.config.json

    if (dappSeed == null){
        throw new Error(`Please provide dappSedd`)
    }
    const ssTx1 = setScript({
        script,
        additionalFee: 400000 // Uncomment to raise fee in case of redeployment
    }, dappSeed1);
    await broadcast(ssTx1);
    await waitForTx(ssTx1.id);
    console.log(ssTx1.id);

    const ssTx2 = setScript({
        script,
        additionalFee: 400000 // Uncomment to raise fee in case of redeployment
    }, dappSeed2);
    await broadcast(ssTx2);
    await waitForTx(ssTx2.id);
    console.log(ssTx2.id);

    const ssTx3 = setScript({
        script,
        additionalFee: 400000 // Uncomment to raise fee in case of redeployment
    }, dappSeed3);
    await broadcast(ssTx3);
    await waitForTx(ssTx3.id);
    console.log(ssTx3.id);

})();
