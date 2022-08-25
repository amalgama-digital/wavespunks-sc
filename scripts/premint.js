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

    var userPremint = []

    for (let index = 0; index < userPremint.length; index++) {
        var premintAddressTx = data({
            data: [{
                type: 'boolean',
                key: userPremint[index],
                value: true,
            }],
            fee: 1000000,
        }, dappSeed);
        await broadcast(premintAddressTx);
        await waitForTx(premintAddressTx.id)
        console.log('Premint addresses was added')
    }    

})();
