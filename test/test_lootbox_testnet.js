// const { SEED, SEED1, SeedVote1, SeedVote2, SeedVote3 } = require ("./config");
const Constants = require('./config');
/* 
struct config:
const Constants = {
    SEED: "",
    SEED1: "",
    SeedVote1: "", 
    SeedVote2: "",
    SeedVote3: ""
  }
module.exports = Constants
*/

describe('test in testnet: verifycollection.ride', () => {

    before(async function () {
        
        // const script = compile(file('lootbox.ride'));
        // const ssTx = setScript({script, fee: 1400000});
        // await broadcast(ssTx);
        // await waitForTx(ssTx.id);
        // console.log('Script has been set');
        // const startTime =  Date.now()-1000000;
        // const endTime =  Date.now()+100000;
        // const initTx = invokeScript({
        //     fee: 9000000, 
        //     dApp: address(accounts.deploy), 
        //     call:{function:"initTime", 
        //         args:[
        //             {
        //             type: "integer", 
        //             value: startTime
        //             },
        //             {
        //             type: "integer", 
        //             value: endTime
        //             }
        //         ]}
        //     })
        // await broadcast(initTx);
        // await waitForTx(initTx.id)
        // console.log('Init start and end time')

    });

    describe('positive test', async function () {
        xit('Drop lootbox', async function () {
            const dropTx = invokeScript({
                fee: 900000, 
                dApp: address(accounts.deploy),
                call: {
                    function: "dropLootbox",
                    args: [
                        {
                        type: "string",
                        value: address(Constants.SEED1)
                        }
                    ]
                }
            })
            console.log(address(Constants.SEED))
            console.log(address(Constants.SEED1))
            await broadcast(dropTx);
            await waitForTx(dropTx.id)
            
        })

        it('Open lootbox', async function () {
            const openTx = invokeScript({
                dApp: address(accounts.deploy),
                call: {
                    function: "claimLootbox",
                },
            }, Constants.SEED1)
            
            await broadcast(openTx);
            await waitForTx(openTx.id)
        })
    })
})