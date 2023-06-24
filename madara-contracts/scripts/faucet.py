# %% Imports
import logging
from asyncio import run
from math import ceil, log

from scripts.constants import COMPILED_CONTRACTS, NETWORK, RPC_CLIENT
from scripts.utils import fund_address

logging.basicConfig()
logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)

# %% Main
async def main():
    # %% Declarations
    logger.info(
        f"ℹ️  Connected to CHAIN_ID {NETWORK['chain_id'].value.to_bytes(ceil(log(NETWORK['chain_id'].value, 256)), 'big')} "
        f"with RPC {RPC_CLIENT.url}"
    )
    address = int(input("Enter address: "), 16)
    logger.info(f"ℹ️  Funding account {hex(address)} with 10 ETH")
    await fund_address(address, amount=10)
    logger.info(f"ℹ️  Deploying account")
    logger.info(f"ℹ️  Using account {hex(address)} as deployer")


# %% Run
if __name__ == "__main__":
    run(main())
