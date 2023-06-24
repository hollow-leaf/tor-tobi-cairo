import * as starknet from 'starknet'
import { task } from 'hardhat/config'

task('faucet', 'Madara Faucet')
  .addParam('to')
  .setAction(async ({ to }, hre) => {
    console.log(`Network - ${hre.starknet.network}`)
    if (!(hre.starknet.network === 'sharingan' || hre.starknet.network === 'madara')) { throw new Error('Only deploy to madara') }
    const eth_address = '0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7'
    const provider = new starknet.RpcProvider({ nodeUrl: hre.starknet.networkConfig.url as string })
    const starkKeyPair = starknet.ec.getKeyPair('0x00c1cf1490de1352865301bb8705143f3ef938f97fdf892f1090dcb5ac7bcd1d')
    const address = '0x2'
    const nonce = await provider.getNonceForAddress(address)
    const chainId = await provider.getChainId()

    const calldata = starknet.transaction.fromCallsToExecuteCalldata([
      {
        contractAddress: eth_address,
        entrypoint: 'transfer',
        calldata: starknet.stark.compileCalldata({
          recipient: to,
          amount: {
            type: 'struct',
            low: '1000000',
            high: '0',
          },
        }),
      },
    ])
    const maxFee = '0x11111111111'
    const version = '0x1'
    const txnHash = starknet.hash.calculateTransactionHash(
      address,
      version,
      calldata,
      maxFee,
      chainId,
      nonce,
    )
    const signature = starknet.ec.sign(starkKeyPair, txnHash)
    const invocationCall = {
      signature,
      contractAddress: address,
      calldata,
    }
    const invocationDetails = {
      maxFee,
      nonce,
      version,
    }

    // if estimating fees passes without failures, the txn should go through
    const estimateFee = await provider.getEstimateFee(
      invocationCall,
      invocationDetails,
    )
    console.log('Estimate fee - ', estimateFee)

    const tx = await provider.invokeFunction(invocationCall, invocationDetails)
    console.log(tx.transaction_hash)

    console.log(await hre.starknet.getBalance(to))
  })
