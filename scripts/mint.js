const { randomHexadecimalAddress, initContracts } = require('./utils')

async function main() {
  const { shadoaw } = await initContracts()
  const num = 100
  const addresses = []
  for (let i = 0; i < num; i++) {
    const address = randomHexadecimalAddress()
    addresses.push(address)
  }
  await shadoaw.adminMint(addresses)
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
