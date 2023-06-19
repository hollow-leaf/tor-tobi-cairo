import hardhat from 'hardhat'
import { getOZAccount } from './util/OZAccount'

async function main () {
  let account = null
  if (hardhat.starknet.network === 'alphaGoerli') {
    return
  } else {
    account = await hardhat.starknet.OpenZeppelinAccount.getAccountFromAddress(
      '0x347be35996a21f6bf0623e75dbce52baba918ad5ae8d83b6f416045ab22961a' as string,
      '0xbdd640fb06671ad11c80317fa3b1799d' as string,
    )
  }
  const contractFactory = await hardhat.starknet.getContractFactory('contract1')
  await account.declare(contractFactory, { maxFee: 1e18 })
  const contract = await account.deploy(contractFactory, {
    initial_balance: 0,
  })
  console.log('Deployed to:', contract.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
