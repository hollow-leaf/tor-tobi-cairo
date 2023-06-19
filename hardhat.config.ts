import { HardhatUserConfig } from 'hardhat/types'
import '@shardlabs/starknet-hardhat-plugin'
import { config as dotenvConfig } from 'dotenv'
import { resolve } from 'path'
dotenvConfig({ path: resolve(__dirname, './.env') })

const config: HardhatUserConfig = {
  starknet: {
    dockerizedVersion: '0.11.0.2',
    recompile: false,
    network: 'devnet',
    wallets: {
      OpenZeppelin: {
        accountName: 'OpenZeppelin',
        modulePath: 'starkware.starknet.wallets.open_zeppelin.OpenZeppelinAccount',
        accountPath: '~/.starknet_accounts',
      },
    },
  },
  networks: {
    alphaGoerli: {
      url: 'https://alpha4.starknet.io',
    },
    devnet: {
      url: 'http://127.0.0.1:5050',
    },
    madara: {
      url: 'http://127.0.0.1:9944',
    },
    integration: {
      url: 'https://external.integration.starknet.io',
    },
    integratedDevnet: {
      url: 'http://127.0.0.1:5050',
      dockerizedVersion: '0.5.3',
      args: [
        '--seed',
        '42',
      ],
    },
    hardhat: {},
  },
}

export default config
