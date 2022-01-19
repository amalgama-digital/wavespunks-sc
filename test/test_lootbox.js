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
    });
    
    it('Can deposit', async function () {

    })
})