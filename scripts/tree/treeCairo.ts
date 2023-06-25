import { Account, Contract, ec, Provider } from 'starknet'
import * as starknet from 'starknet'
import { devnetTreeAddress } from '../config'
import { config as dotenvConfig } from 'dotenv'
import { resolve } from 'path'
import readline from 'readline'
dotenvConfig({ path: resolve(__dirname, '../../.env') })

export const DEPLOYACCT_ADDRESS = ensureEnvVar('DEPLOYACCT_ADDRESS')
export const DEPLOYACCT_PRIVATE_KEY = ensureEnvVar('DEPLOYACCT_PRIVATE_KEY')

export function ensureEnvVar (varName: string): string {
  if (!process.env[varName]) {
    throw new Error(`Env var ${varName} not set or empty`)
  }
  return process.env[varName] as string
}

async function main () {
  // connect to starknet devnet
  const provider = new Provider({ sequencer: { baseUrl: 'http://127.0.0.1:5050' } })
  const starkKeyPair = ec.getKeyPair(DEPLOYACCT_PRIVATE_KEY)
  const wallet = new Account(provider, DEPLOYACCT_ADDRESS, starkKeyPair)
  console.log(`address: ${devnetTreeAddress.main}`)
  const { abi: testAbi } = await wallet.getClassAt(`${devnetTreeAddress.main}`)
  if (testAbi === undefined) { throw new Error('no abi.') }
  const myTestContract = new Contract(testAbi, devnetTreeAddress.main, wallet)
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  rl.question('What is your transaction:', (transaction) => {
    rl.question('What is your amount:', async (amount) => {
      const tx = starknet.number.hexToDecimalString(transaction)
      await myTestContract.invoke('tree', [tx, amount])
      const root = await myTestContract.call('get_root')
      console.log('Proof = ', root.res.toString())
    })
  })
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
