const htmlIPFS = 'ipfs://asdf/'
const gifIPFS = 'ipfs://qwerty/'
async function main() {

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

  // empty metadata directory
  const metadataPath = path.join(
    __dirname,
    '..',
    'metadata'
  )
  fs.existsSync(metadataPath) && fs.rmSync(metadataPath, { recursive: true, force: true })
  fs.mkdirSync(metadataPath)

  const description = 'DoAW is an artwork by Joan Heemskerk, presented by Folia.'
  const external_url = 'https://doaw.folia.app/tokens/'
  const image = gifIPFS
  const animation_url = htmlIPFS + 'nft.html#'
  // the sauce
  const metadata = {
    // both opensea and rarebits
    name: null,
    description,
    // opensea
    external_url,
    // rarebits
    home_url: external_url,
    // opensea
    image,
    // rarebits
    image_url: image,
    // animation
    animation_url
  }

  for (let i = 0; i < wallets.length; i++) {
    const wallet = wallets[i]
    const metadataCopy = { ...metadata }
    metadataCopy.name = wallet.words

    metadataCopy.description = `${wallet.words}\n${wallet.pk}\n${wallet.address}`
    metadataCopy.external_url += wallet.entropyHex

    metadataCopy.image += wallet.entropyHex + '.gif'
    metadataCopy.image_url = metadataCopy.image
    metadataCopy.animation_url += wallet.entropyHex
    const filename = wallet.entropyHex + '.json'

    // Save metadata to metadata/tokenId.json
    const metadataFilePath = path.join(metadataPath, filename)
    fs.writeFileSync(metadataFilePath, JSON.stringify(metadataCopy, null, 2))
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
