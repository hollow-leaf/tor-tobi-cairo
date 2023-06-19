import hardhat from 'hardhat'
import * as dotenv from 'dotenv'
dotenv.config()

export const OZ_ACCOUNT_ADDRESS = process.env.OZ_ACCOUNT_ADDRESS as string
export const OZ_ACCOUNT_PRIVATE_KEY = process.env.OZ_ACCOUNT_PRIVATE_KEY as string

export async function getOZAccount () {
  return await hardhat.starknet.OpenZeppelinAccount.getAccountFromAddress(
    OZ_ACCOUNT_ADDRESS,
    OZ_ACCOUNT_PRIVATE_KEY,
  )
}

async function main () {
  const account = await getOZAccount()
  const contractFactory = await hardhat.starknet.getContractFactory('contract')
  await account.declare(contractFactory)
  const contract = await account.deploy(contractFactory, {
    initial_balance: 0,
  })
  console.log('Deployed to:', contract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
