
const { initContracts } = require('./utils')
const fs = require('fs-extra')
const path = require('path')

async function main() {
  const { shadoaw } = await initContracts()

  // save wallets to wallets.json
  const savePath = path.join(__dirname, '..', 'wallets.json')
  // const shaDoAWDir = path.join(__dirname, '..', 'shaDoAW')

  // Delete the directory if it exists
  // await fs.remove(shaDoAWDir)
  // Recreate the directory
  // await fs.ensureDir(shaDoAWDir)

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
    // const filename = path.join(shaDoAWDir, (i + 1).toString())
    // await fs.writeFile(filename, JSON.stringify(metadata, null, 2))
  }
  console.log({ recipients: recipients.length })
  const chunk = 51
  const chunks = []
  for (let i = 0; i < recipients.length; i += chunk) {
    const ch = recipients.slice(i, i + chunk)
    chunks.push(ch)
  }
  console.log(chunks.length)
  for (let i = 0; i < chunks.length; i++) {
    const ch = chunks[i]
    console.log(`minting ${ch.length} tokens`)
    const tx = await shadoaw.adminMint(ch)
    console.log({ tx })
    await tx.wait()
  }
  console.log('Minted')
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
