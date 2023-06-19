import { task } from 'hardhat/config'
import { writeFileSync } from '../helpers/pathHelper'
import { config as dotenvConfig } from 'dotenv'
import { resolve } from 'path'
dotenvConfig({ path: resolve(__dirname, '../../.env') })

export const DEPLOYACCT_ADDRESS = ensureEnvVar('DEPLOYACCT_ADDRESS')
export const DEPLOYACCT_PRIVATE_KEY = ensureEnvVar('DEPLOYACCT_PRIVATE_KEY')

export function ensureEnvVar (varName: string): string {
  if (!process.env[varName]) {
    throw new Error(`Env var ${varName} not set or empty`)
  }
  return process.env[varName] as string
}

task('deploy:cairo', 'Deploy Cairo0 Contract')
  .addParam('contract')
  .setAction(async ({ contract }, hre) => {
    await hre.run('starknet-compile-deprecated', {
      paths: [`contracts/cairo0/${contract}.cairo`],
    })
    let account = null
    if (hre.starknet.network === 'alphaGoerli') {
      // @TODO: add account deploy on goerli
      throw new Error('Cannot deploy to alphaGoerli')
    } else {
      account = await hre.starknet.OpenZeppelinAccount.getAccountFromAddress(
        DEPLOYACCT_ADDRESS,
        DEPLOYACCT_PRIVATE_KEY,
      )
    }
    const contractFactory = await hre.starknet.getContractFactory(`contracts/cairo0/${contract}.cairo`)
    await account.declare(contractFactory)
    // constucter add here
    const contractDeployInfo = await account.deploy(contractFactory)
    console.log(`${contract} deployed to: ${contractDeployInfo.address}`)
    const addressData = JSON.stringify({ main: contractDeployInfo.address })
    writeFileSync(`scripts/address/${hre.starknet.network}/`, `${contract}.json`, addressData)
  })

task('deploy:cairo1', 'Deploy Cairo1 Contract')
  .addParam('contract')
  .setAction(async ({ contract }, hre) => {
    await hre.run('starknet-compile', {
      paths: [`contracts/cairo1/${contract}.cairo`],
      allowedLibfuncsListName: 'experimental_v0.1.0',
      addPythonicHints: true,
    })
    let account = null
    if (hre.starknet.network === 'alphaGoerli') {
      // @TODO: add account deploy on goerli
      throw new Error('Cannot deploy to alphaGoerli')
    } else {
      account = await hre.starknet.OpenZeppelinAccount.getAccountFromAddress(
        DEPLOYACCT_ADDRESS,
        DEPLOYACCT_PRIVATE_KEY,
      )
    }
    const contractFactory = await hre.starknet.getContractFactory(`contracts/cairo1/${contract}.cairo`)
    await account.declare(contractFactory)
    // constucter add here
    const contractDeployInfo = await account.deploy(contractFactory, {
      initial_balance: 0,
    })
    console.log(`${contract} deployed to: ${contractDeployInfo.address}`)
    const addressData = JSON.stringify({ main: contractDeployInfo.address })
    writeFileSync(`scripts/address/${hre.starknet.network}/`, `${contract}.json`, addressData)
  })
