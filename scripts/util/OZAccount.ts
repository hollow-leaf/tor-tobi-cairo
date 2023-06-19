import { starknet } from 'hardhat'
import { config as dotenvConfig } from 'dotenv'
import { resolve } from 'path'
dotenvConfig({ path: resolve(__dirname, '../../.env') })

export const OZ_ACCOUNT_ADDRESS = '0x347be35996a21f6bf0623e75dbce52baba918ad5ae8d83b6f416045ab22961a'// ensureEnvVar('OZ_ACCOUNT_ADDRESS')
export const OZ_ACCOUNT_PRIVATE_KEY = '0xbdd640fb06671ad11c80317fa3b1799d'// ensureEnvVar('OZ_ACCOUNT_PRIVATE_KEY')

export function ensureEnvVar (varName: string): string {
  if (!process.env[varName]) {
    throw new Error(`Env var ${varName} not set or empty`)
  }
  return process.env[varName] as string
}

/**
 * Returns an instance of OZAccount. Expected to be deployed)
 */
export async function getOZAccount () {
  console.log('get oz ac')
  return await starknet.OpenZeppelinAccount.getAccountFromAddress(
    '0x347be35996a21f6bf0623e75dbce52baba918ad5ae8d83b6f416045ab22961a' as string,
    '0xbdd640fb06671ad11c80317fa3b1799d' as string,
  )
}
