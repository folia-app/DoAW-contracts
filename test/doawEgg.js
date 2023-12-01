const { expect } = require('chai')
const { ethers } = require('hardhat')
const { deployContracts, randomHexadecimalAddress } = require('../scripts/utils.js')
describe('DoAWEgg Tests', function () {
  this.timeout(50000000)

  it('has the correct metadata and splitter and start date', async () => {
    const { doaw, doawEgg, metadata } = await deployContracts()

    const metadataAddress = await doaw.metadata()
    expect(metadataAddress).to.equal(metadata.address)

    const metadataAddressEgg = await doawEgg.metadata()
    expect(metadataAddressEgg).to.equal(metadata.address)
  })

  it('onlyOwner functions are really only Owner', async function () {
    const [, addr1] = await ethers.getSigners()
    const { doawEgg } = await deployContracts()

    await expect(doawEgg.connect(addr1).setMetadata(addr1.address))
      .to.be.revertedWith('Ownable: caller is not the owner')

    await expect(doawEgg.setMetadata(addr1.address))
      .to.not.be.reverted
  })


  it('has all the correct interfaces', async () => {
    const interfaces = [
      { name: 'ERC165', id: '0x01ffc9a7', supported: true },
      { name: 'ERC721', id: '0x80ac58cd', supported: true },
      { name: 'ERC721Metadata', id: '0x5b5e139f', supported: true },
      { name: 'ERC721Enumerable', id: '0x780e9d63', supported: false },
      { name: 'ERC2981', id: '0x2a55205a', supported: false },
      { name: 'ERC20', id: '0x36372b07', supported: false },
    ]
    const { doawEgg } = await deployContracts()

    for (let i = 0; i < interfaces.length; i++) {
      const { name, id, supported } = interfaces[i]
      const supportsInterface = await doawEgg.supportsInterface(id)
      expect(name + supportsInterface).to.equal(name + supported)
    }
  })

  it('fails to adminMint when not owner', async function () {
    const [, , , addr3] = await ethers.getSigners()
    const { doawEgg } = await deployContracts()
    await expect(doawEgg.connect(addr3).adminMint([addr3.address]))
      .to.be.revertedWith('Ownable: caller is not the owner')
  })

  //
  // Minting tests
  //

  it('token ID is correctly correlated', async function () {
    const [owner] = await ethers.getSigners()
    const { doawEgg } = await deployContracts()
    await doawEgg.adminMint([owner.address])
    const tokenID = await doawEgg.totalSupply()
    expect(tokenID).to.equal(1)
  })

  it('adminMint from owner address', async function () {
    const [, addr1] = await ethers.getSigners()
    const { doawEgg } = await deployContracts()
    await doawEgg.adminMint([addr1.address])
    const tokenId = 1
    expect(await doawEgg.ownerOf(tokenId)).to.equal(addr1.address)
  })

  it('adminMints a lot of addresses', async function () {
    const { doawEgg } = await deployContracts()
    const num = 100
    const addresses = []
    for (let i = 0; i < num; i++) {
      const address = randomHexadecimalAddress()
      addresses.push(address)
    }
    expect(await doawEgg.adminMint(addresses)).to.not.be.reverted
    const totalSupply = await doawEgg.totalSupply()
    expect(totalSupply).to.equal(num)
  })

  it.only('adminMints a lot of addresses #2', async function () {
    const { doawEgg } = await deployContracts()
    const num = 500
    const addresses = []
    for (let i = 0; i < num; i++) {
      const address = randomHexadecimalAddress()
      addresses.push(address)
    }
    expect(await doawEgg.adminMint(addresses)).to.not.be.reverted
    const totalSupply = await doawEgg.totalSupply()
    expect(totalSupply).to.equal(num)
  })

})
