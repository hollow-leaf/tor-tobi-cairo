import { HardhatUserConfig } from 'hardhat/types'
import '@shardlabs/starknet-hardhat-plugin'
import * as dotenv from 'dotenv'
dotenv.config()

const config: HardhatUserConfig = {
  starknet: {
    dockerizedVersion: '0.11.0.2',
    recompile: false,
    network: 'integrated-devnet',
    wallets: {
      OpenZeppelin: {
        accountName: 'OpenZeppelin',
        modulePath:
          'starkware.starknet.wallets.open_zeppelin.OpenZeppelinAccount',
        accountPath: '~/.starknet_accounts',
      },
    },
  },
  networks: {
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
      // venv: 'active',
      // dockerizedVersion: '<DEVNET_VERSION>',
    },
    hardhat: {},
  },
}

export default config
