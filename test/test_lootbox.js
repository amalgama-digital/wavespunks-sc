const wvs = 10 ** 8;

describe('test lootbox script', async function () {

    this.timeout(100000);

    before(async function () {
        await setupAccounts(
            {foofoofoofoofoofoofoofoofoofoofoo: 10 * wvs,
                 barbarbarbarbarbarbarbarbarbar: 2 * wvs,
                  wallet: 0.05 * wvs});
        const script = compile(file('wallet.ride'));
        const ssTx = setScript({script}, accounts.wallet);
        await broadcast(ssTx);
        await waitForTx(ssTx.id)
        console.log('Script has been set')
    });
    
    it('Can deposit', async function () {

    })
})