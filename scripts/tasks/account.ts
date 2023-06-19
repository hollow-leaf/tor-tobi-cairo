import { task } from 'hardhat/config'

function keypress () {
  process.stdin.setRawMode(true)
  return new Promise<void>((resolve) =>
    process.stdin.once('data', () => {
      process.stdin.setRawMode(false)
      resolve()
    }),
  )
}
task('account:new', 'Deploy OpenZeppelin Account')
  // .addOptionsParam('priv', 'Private Key', process.env.PRIVATE_KEY as string)
  .addOptionalParam('salt', 'Salt Value (Default: 0x42)', '0x42')
  .addOptionalParam('priv', 'Private Key File (Default: env)', `${process.env.PRIVATE_KEY}`)
  .setAction(async (taskArgs, hre) => {
    const account = await hre.starknet.OpenZeppelinAccount.createAccount({
      salt: '0x42', // if undefined, will generate new values
      privateKey: taskArgs.priv,
    })
    console.log(`Account created at ${account.address} with private key ${account.privateKey} and public key ${account.publicKey}`)
    console.log('Please fund the address. Even after you get a confirmation that the funds were transferred, you may want to wait for a couple of minutes.')

    let funded = false
    while (!funded) {
      console.log('Press any key to continue...')
      await keypress()
      const balance = await hre.starknet.getBalance(account.address)
      if (balance === 0n) {
        console.log(
          'Account not yet funded! Please fund it or wait another minute.',
        )
      } else {
        console.log(`Account has a balance of ${balance} wei`)
        funded = true
      }
    }

    console.log('Deploying...')
    const deploymentTxHash = await account.deployAccount({ maxFee: 1e18 })
    console.log(`Deployed in tx ${deploymentTxHash}`)
  })
