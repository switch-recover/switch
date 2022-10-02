import { HardhatUserConfig } from "hardhat/config"
import "@nomicfoundation/hardhat-toolbox"
import "@shardlabs/starknet-hardhat-plugin"

const config: HardhatUserConfig = {
    solidity: {
        version: "0.8.9",
    },
    networks: {
        "goerli-alpha": {
            url: "https://alpha4.starknet.io",
        },
    },
}

export default config
