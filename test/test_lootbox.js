const wvs = 10 ** 8;

describe('test lootbox script', async function () {

    this.timeout(100000);

    before(async function () {
        await setupAccounts(
            {alice: 10 * wvs,
            bob: 10 * wvs,
            deploy: 10 * wvs});
        const script = compile(file('lootbox.ride'));
        const ssTx = setScript({script}, accounts.deploy);
        await broadcast(ssTx);
        await waitForTx(ssTx.id);
        console.log('Script has been set');
        const startTime =  Date.now()-1000000;
        const endTime =  Date.now()+10000;
        const initTx = invokeScript({
            fee: 900000, 
            dApp: address(accounts.deploy), 
            call:{function:"initTime", 
                args:[
                    {
                    type: "integer", 
                    value: startTime
                    },
                    {
                    type: "integer", 
                    value: endTime
                    }
                ]}
            }, accounts.deploy)
        await broadcast(initTx);
        await waitForTx(initTx.id)
        console.log('Init start and end time')

    });
    
    it('Drop lootbox', async function () {
        await setupAccounts({foo:10, bar: 20})
        const initTx = invokeScript({
            fee: 900000, 
            dApp: address(accounts.deploy),
            call: {
                function: "dropLootbox",
                args: [
                    {
                    type: "string",
                    value: address(accounts.alice)
                    }
                ]
            }
        }, accounts.deploy)
        await broadcast(initTx);
        await waitForTx(initTx.id)
        
    })

    it('Open lootbox', async function () {
        await waitNBlocks(2)
        const initTx = invokeScript({
            dApp: address(accounts.deploy),
            call: {
                function: "claimLootbox",
            },
        }, accounts.alice)
        
        await broadcast(initTx);
        await waitForTx(initTx.id)
    })

    

    
})