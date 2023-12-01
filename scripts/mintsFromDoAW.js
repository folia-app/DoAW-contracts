const { initContracts } = require('./utils')

async function main() {
  const { doaw } = await initContracts()

  // console.log({ doaw })
  const fromBlock = 0
  const toBlock = 'latest'

  // Get all previous ERC-721 token transfer events
  const transferEvents = await doaw.queryFilter(doaw.filters.Transfer(),
    fromBlock,
    toBlock
  )

  const wallets = []

  // Process the transfer events
  transferEvents.forEach((event) => {
    if (event.args.from === '0x0000000000000000000000000000000000000000') {
      const entropyHex = event.args.tokenId.toHexString(16).replace('0x', '').padStart(32, '0')
      console.log({ entropyHex }, entropyHex.length)
      const data = hexToBytes(entropyHex)
      const words = ethers.utils.entropyToMnemonic(data)
      const path = ethers.utils.defaultPath
      const hdNode = ethers.utils.HDNode.fromMnemonic(words)
      const pk = hdNode.derivePath(path).privateKey
      const wallet = new ethers.Wallet(pk)
      const address = wallet.address

      const walletData = {
        tokenId: event.args.tokenId.toString(),
        entropyHex: entropyHex,
        words,
        pk,
        address,
      }
      wallets.push(walletData)
    }
  })

  // save wallets to wallets.json
  const fs = require('fs')
  const path = require('path')
  const savePath = path.join(
    __dirname,
    '..',
    'wallets.json'
  )
  // save file
  fs.writeFileSync(savePath, JSON.stringify(wallets, null, 2))
  const pks = wallets.map((wallet, i) => 'pk' + i + '=' + wallet.pk).join('\n')
  const prodEnvPath = path.join(
    __dirname,
    '..',
    'prod.env'
  )

  fs.writeFileSync(prodEnvPath, pks)
}

const hexToBytes = (hextropy) => {
  var bytes = []
  for (var c = 0; c < hextropy.length; c += 2) {
    const int = parseInt(hextropy.substr(c, 2), 16)
    if (isNaN(int)) throw new Error('Entropy is not valid hex')
    bytes.push(int)
  }
  return bytes
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
