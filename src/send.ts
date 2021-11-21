import { transfer, broadcast, waitForTx } from '@waves/waves-transactions';
import { CHAIN_ID, API_BASE, SEED, TIMEOUT } from './config';

async function init() {
    const dataTx = transfer({
        chainId: CHAIN_ID,
        recipient: '3Msrw9Kxa6RgHYQ63sSib9uESmaBU9gH6Gy',
        amount: 22000000000,
        fee: 1000000,
    }, SEED);
    
    await broadcast(dataTx, API_BASE);
    await waitForTx(dataTx.id, { apiBase: API_BASE, timeout: TIMEOUT });
}

init().catch(e => {
    console.log(e);
});
