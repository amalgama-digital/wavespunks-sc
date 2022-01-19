const { address } = require("@waves/ts-lib-crypto");
const { invokeScript } = require("@waves/waves-transactions");

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
        await waitForTx(ssTx.id)
        console.log('Script has been set')
        const initTx = invokeScript({
            dApp: address(accounts.deploy),
            call: {
                function: "initTime",
                args: [{type: "integer", value: Date.now},
                        {type: "integer", value: Date.now + 10000}]
            }
        })
        await broadcast(initTx);
        await waitForTx(initTx.id)
        console.log('Init start and end time')

    });
    
    it('Drop lootbox', async function () {
        
    })
})