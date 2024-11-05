import { config, ethers, network } from "hardhat";
import fs from "fs";
async function main() {
    // const addr = config.addresses;
    const netinfo = await ethers.provider.getNetwork();
    let network = netinfo.name;
    if (network === "unknown") {
        network = "mainnet";
    }

    const chainId = netinfo.chainId;
    console.log("============================================================");
    console.log("");
    console.log("Deployment Started ...");
    console.log("Deploying on " + network + " (chainId: " + chainId + ") ...");
    console.log("");

    // get the signers
    const [owner] = await ethers.getSigners();

    const ownerAddress = await owner.getAddress();
    console.log("");
    console.log("Deploying from account: " + ownerAddress);
    console.log("");
    console.log("Deploying from contracts...");

    const Admin = await ethers.getContractFactory('Admin');
    let admin = await (await Admin.deploy(ownerAddress)).deployed();

    await writeAddress('Admin', admin.address, [ownerAddress], chainId);

  console.log("Deployment Completed!");
  console.log("");
  console.log("Admin deployed at: " + admin.address);
}

let root: any = {};

const writeAddress = async (factoryName: string, address: string, args: any[], chainId: number) => {
  root[factoryName] = {}
  root[factoryName][chainId] = {
      address,
      args
  }

  const json = JSON.stringify(root);
  fs.writeFileSync('verify_addresses.json', json);
}


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
