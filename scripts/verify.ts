import { ethers } from "hardhat";
import addresses from '../verify_addresses.json';

async function main() {
    const netinfo = await ethers.provider.getNetwork();
    const network = netinfo.name;
    const chainId = netinfo.chainId;


    console.log("============================================================");
    console.log("");
    console.log("Verification Started ...");
    console.log("Verifying contracts on " + network + " (chainId: " + chainId + ") ...");
    console.log("");

    const nft = addresses.NFT;
    await verifyContract(nft, chainId);
    

    console.log("");
    console.log("Verification is completed ...");
    console.log("============================================================");
}

async function verifyContract(contractInfo: { [x: string]: any; 8453?: { address: string; args: string[]; }; }, chainId: number) {
    if (contractInfo) {
        const contract = contractInfo[chainId]
        if (contract) {
            console.log('contract', contract);
            console.log('contract address', contract.address);
            if (contract && contract.address.length > 0) {
                try {
                    await hre.run("verify:verify", {
                        address: contract.address,
                        constructorArguments: contract.args || [],
                    });

                    console.log("Verified Contract!", contract.address);
                } catch (e) {
                    console.log(e)
                    console.log(" Contract verification failed!");
                }
            }
        }
    }
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });