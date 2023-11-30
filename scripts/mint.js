const { randomHexadecimalAddress, initContracts, correctPrice } = require("./utils");

async function main() {
  const [owner] = await hre.ethers.getSigners();
  const { doawEgg } = await initContracts();
  const num = 100;
  const addresses = [];
  for (i = 0; i < num; i++) {
    const address = randomHexadecimalAddress()
    addresses.push(address)
  }
  await doawEgg.adminMint(addresses);
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
