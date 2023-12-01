
const { initContracts } = require('./utils')

async function main() {
  const { doawEgg } = await initContracts()

  // save wallets to wallets.json
  const fs = require('fs')
  const path = require('path')
  const savePath = path.join(
    __dirname,
    '..',
    'wallets.json'
  )
  // read file
  const wallets = JSON.parse(fs.readFileSync(savePath))

  const recipients = []
  for (let i = 0; i < wallets.length; i++) {
    const wallet = wallets[i]
    const balance = await doawEgg.balanceOf(wallet.address)
    if (balance.eq(0)) {
      recipients.push(wallet.address)
    }
  }
  console.log({ recipients: recipients.length })

  await doawEgg.adminMint(recipients)
  console.log('Minted')
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
