const wvs = 10 ** 8;

describe('test lootbox script', async function () {
    var arr = []
    this.timeout(100000);

    before(async function () {
        for (let index = 0; index < 5; index++) {
            await setupAccounts({temp: 10 * wvs});
            arr.push(accounts.temp)
        }
        console.log(arr)
        await setupAccounts(
            {alice: 10 * wvs,
            bob: 10 * wvs,
            deploy: 10 * wvs});
        const script = compile(file('lootbox.ride'));
        const ssTx = setScript({script}, accounts.deploy);
        await broadcast(ssTx);
        await waitForTx(ssTx.id);
        console.log('Script has been set');
        const startTime =  Date.now()-100000;
        const endTime =  Date.now()+70000;
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
    
    it('Drop lootboxes', async function () {
        for (let index = 0; index < 5; index++) {
            var dropTx = invokeScript({
                fee: 900000, 
                dApp: address(accounts.deploy),
                call: {
                    function: "dropLootbox",
                    args: [
                        {
                        type: "string",
                        value: address(arr[index])
                        }
                    ]
                }
            }, accounts.deploy)
            await broadcast(dropTx);
            await waitForTx(dropTx.id);
            console.log("Drop #" + index.toString())
            await waitNBlocks(1)
            
        }
                
    })

    it('Open lootbox', async function () {
        await waitNBlocks(1)
        for (let index = 0; index < 5; index++) {
            var openTx = invokeScript({
                dApp: address(accounts.deploy),
                call: {
                    function: "claimLootbox",
                },
            }, arr[index])
            await broadcast(openTx);
            await waitForTx(openTx.id);
            await waitNBlocks(1)

        }
        
        for (let index = 0; index < 5; index++) {
            console.log(accountDataByKey(address(arr[index]) + "_status", address(accounts.deploy)).toString())
        }
        
        
        
    })



    
})