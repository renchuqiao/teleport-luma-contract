import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "dotenv/config";

const config: HardhatUserConfig = {
  solidity: "0.8.18",
};

export default config;

module.exports = {
  networks: {
    base_mainnet: {
      url: process.env.BASE_MAINNET_URL,
      chainId: 8453,
      accounts: [`0x${process.env.PRIVATE_KEY}`],
      zksync: false
    },
  },
  etherscan: {
    apiKey: {
      base_mainnet: `${process.env.BASESCAN_API_KEY}`,
    },
    customChains: [
      {
          network: "base_mainnet",
          chainId: 8453,
          urls: {
              apiURL: "https://api.basescan.org/api",
              browserURL: "https://basescan.org"
          }
      },
    ],
  },
  solidity: {
    compilers: [
        {
            version: "0.8.22",
            settings: {
                optimizer: {
                    enabled: true,
                    runs: 200
                }
            }
        },
        {
            version: "0.8.20",
            settings: {
                optimizer: {
                    enabled: true,
                    runs: 200
                }
            }
        },
        {
            version: "0.8.9",
            settings: {
                optimizer: {
                    enabled: true,
                    runs: 200
                }
            }
        }
    ]
  }
}
