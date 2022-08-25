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

        var premintAddressTx = data({
            data: [{
                type: 'string',
                key: "key",
                value: null,
            }],
            fee: 1000000,
        }, dappSeed);
        await broadcast(premintAddressTx);
        await waitForTx(premintAddressTx.id)
        console.log('Premint addresses was added')


})();
