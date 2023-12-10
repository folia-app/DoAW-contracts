const { expect } = require('chai')
const { ethers } = require('hardhat')
const { deployContracts, randomHexadecimalAddress } = require('../scripts/utils.js')
describe('shaDoAW Tests', function () {
  this.timeout(50000000)

  it('has the correct metadata and splitter and start date', async () => {
    const { doaw, shadoaw, metadata } = await deployContracts()

    const metadataAddress = await doaw.metadata()
    expect(metadataAddress).to.equal(metadata.address)

    const shadoawMetadataAddress = await shadoaw.metadata()
    expect(shadoawMetadataAddress).to.equal(metadata.address)
  })

  it('onlyOwner functions are really only Owner', async function () {
    const [, addr1] = await ethers.getSigners()
    const { shadoaw } = await deployContracts()

    await expect(shadoaw.connect(addr1).setMetadata(addr1.address))
      .to.be.revertedWith('Ownable: caller is not the owner')

    await expect(shadoaw.setMetadata(addr1.address))
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
    const { shadoaw } = await deployContracts()

    for (let i = 0; i < interfaces.length; i++) {
      const { name, id, supported } = interfaces[i]
      const supportsInterface = await shadoaw.supportsInterface(id)
      expect(name + supportsInterface).to.equal(name + supported)
    }
  })

  it('fails to adminMint when not owner', async function () {
    const [, , , addr3] = await ethers.getSigners()
    const { shadoaw } = await deployContracts()
    await expect(shadoaw.connect(addr3).adminMint([addr3.address]))
      .to.be.revertedWith('Ownable: caller is not the owner')
  })

  //
  // Minting tests
  //

  it('token ID is correctly correlated', async function () {
    const [owner] = await ethers.getSigners()
    const { shadoaw } = await deployContracts()
    await shadoaw.adminMint([owner.address])
    const tokenID = await shadoaw.totalSupply()
    expect(tokenID).to.equal(1)
  })

  it('adminMint from owner address', async function () {
    const [, addr1] = await ethers.getSigners()
    const { shadoaw } = await deployContracts()
    await shadoaw.adminMint([addr1.address])
    const tokenId = 1
    expect(await shadoaw.ownerOf(tokenId)).to.equal(addr1.address)
  })

  it('adminMints a lot of addresses', async function () {
    const { shadoaw } = await deployContracts()
    const num = 100
    const addresses = []
    for (let i = 0; i < num; i++) {
      const address = randomHexadecimalAddress()
      addresses.push(address)
    }
    expect(await shadoaw.adminMint(addresses)).to.not.be.reverted
    const totalSupply = await shadoaw.totalSupply()
    expect(totalSupply).to.equal(num)
  })

  it('adminMints a lot of addresses #2', async function () {
    const { shadoaw } = await deployContracts()
    const [owner, acct1] = await ethers.getSigners()
    const num = 500
    const addresses = [owner.address]
    for (let i = 0; i < num; i++) {
      const address = randomHexadecimalAddress()
      addresses.push(address)
    }
    const tx = await shadoaw.adminMint(addresses) // 4 eur per mint at 42 gwei
    expect(tx).to.not.be.reverted
    tx.wait()

    const tx2 = shadoaw.transferFrom(owner.address, acct1.address, 1)
    expect(await tx2).to.not.be.reverted

    // const totalSupply = await shadoaw.totalSupply()
    // expect(totalSupply).to.equal(num)
  })

})
