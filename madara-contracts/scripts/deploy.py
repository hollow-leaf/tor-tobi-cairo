# %% Imports
import logging
from asyncio import run
from math import ceil, log

from scripts.constants import COMPILED_CONTRACTS, ETH_TOKEN_ADDRESS, NETWORK, RPC_CLIENT
from scripts.utils import (
    call,
    declare,
    deploy,
    deploy_starknet_account,
    dump_declarations,
    dump_deployments,
    get_starknet_account,
    invoke,
)

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
    account = await get_starknet_account()
    if NETWORK["name"] in ["madara", "sharingan"] and account.address == 1:
        await deploy_starknet_account(amount=100)
    account = await get_starknet_account()
    logger.info(f"ℹ️  Using account {hex(account.address)} as deployer")

    class_hash = {
        contract["contract_name"]: await declare(contract["contract_name"])
        for contract in COMPILED_CONTRACTS
    }
    dump_declarations(class_hash)

    # %% Deploy
    deployments = {}
    deployments["WETH"] = await deploy(
        "ERC20",
        "Bitcoin",  # name
        "BTC",  # symbol
        1000000 * 10**18,  # initial_supply
        account.address,  # owner
    )
    
    deployments["Balance"] = await deploy(
        "balance",
       
    )

    dump_deployments(deployments)



# %% Run
if __name__ == "__main__":
    run(main())
