const hre = require("hardhat");

async function main() {
  const CronosLottery = await hre.ethers.getContractFactory("Lottery");
  console.log("Deploying your contract, please Wait.....");
  const cronosLottery = await CronosLottery.deploy();
  await cronosLottery.deployed();

  console.log("CronosToken deployed to:", cronosLottery.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });