
const { initContracts } = require('./utils')
const fs = require('fs-extra')
const path = require('path')

async function main() {
  const { shadoaw } = await initContracts()

  // save wallets to wallets.json
  const savePath = path.join(__dirname, '..', 'wallets.json')
  const shaDoAWDir = path.join(__dirname, '..', 'shaDoAW')

  // Delete the directory if it exists
  await fs.remove(shaDoAWDir)
  // Recreate the directory
  await fs.ensureDir(shaDoAWDir)

  // Rest of the code...
  // read file
  const wallets = JSON.parse(fs.readFileSync(savePath))
  const shaDoAWMetadataTemplate = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'shaDoAW.json')))
  const recipients = []
  for (let i = 0; i < wallets.length; i++) {
    const wallet = wallets[i]
    const balance = await shadoaw.balanceOf(wallet.address)
    if (balance.eq(0)) {
      recipients.push(wallet.address)
    }
    const metadata = JSON.parse(JSON.stringify(shaDoAWMetadataTemplate))
    metadata.name += wallet.words.toUpperCase()
    const filename = path.join(shaDoAWDir, (i + 1) + '.json')
    await fs.writeFile(filename, JSON.stringify(metadata, null, 2))
  }
  console.log({ recipients: recipients.length })
  // await shadoaw.adminMint(recipients)
  console.log('Minted')
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
