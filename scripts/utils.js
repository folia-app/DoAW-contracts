// import { builtinModules } from "node:module";

const hre = require('hardhat')
const path = require('node:path')
const fs = require('fs').promises

const correctPrice = ethers.utils.parseEther('0.055555555555555555')
const splitterAddress = '0xcd2941f651D0fE9a74461A0fCE28a883fF957be1'
const maxSupply = 1024

const testJson = (tJson) => {
  try {
    JSON.parse(tJson)
  } catch (e) {
    return false
  }
  return true
}

const getPathABI = async (name) => {
  var networkinfo = await hre.ethers.provider.getNetwork()
  var savePath = path.join(
    __dirname,
    '..',
    'contractMetadata',
    'ABI-' + String(networkinfo['name']) + '-' + String(name) + '.json'
  )
  return savePath
}

async function readData(path) {
  try {
    const Newdata = await fs.readFile(path, 'utf8')
    return Newdata
  } catch (e) {
    console.log('e', e)
  }
}

const getPathAddress = async (name) => {
  var networkinfo = await hre.ethers.provider.getNetwork()
  var savePath = path.join(
    __dirname,
    '..',
    'contractMetadata',
    String(networkinfo['name']) + '-' + String(name) + '.json'
  )
  return savePath
}

const initContracts = async () => {
  const [owner] = await hre.ethers.getSigners()

  const addressDoAW = JSON.parse(await readData(await getPathAddress('DoAW')))['address']
  const ABIDoAW = JSON.parse(await readData(await getPathABI('DoAW')))['abi']
  let doaw = new ethers.Contract(addressDoAW, ABIDoAW, owner)

  const addressMetadata = JSON.parse(await readData(await getPathAddress('Metadata')))['address']
  const ABIMetadata = JSON.parse(await readData(await getPathABI('Metadata')))['abi']
  let metadata = new ethers.Contract(addressMetadata, ABIMetadata, owner)

  const addressshaDoAW = JSON.parse(await readData(await getPathAddress('shaDoAW')))['address']
  const ABIshaDoAW = JSON.parse(await readData(await getPathABI('shaDoAW')))['abi']
  let shadoaw = new ethers.Contract(addressshaDoAW, ABIshaDoAW, owner)

  return { doaw, metadata, shadoaw }
}

const decodeUri = (decodedJson) => {
  const metaWithoutDataURL = decodedJson.substring(decodedJson.indexOf(',') + 1)
  let buff = Buffer.from(metaWithoutDataURL, 'base64')
  let text = buff.toString('ascii')
  return text
}

const deployContracts = async () => {
  var networkinfo = await hre.ethers.provider.getNetwork()
  const blocksToWaitBeforeVerify = 0
  // const doawAddress = '0x48F7a3c4aB4B7e629FA1338dEFb456683bF0F3e8'
  // const shadoawAddress = '0x2Dc05582Fe3CC0264f501BfF075A8843aCe3F1d3'
  // const metadataAddress = '0x865f2fF4897EFac5294E76209BB76f3F4730336f'
  // return {
  //   doaw: { address: doawAddress },
  //   shadoaw: { address: shadoawAddress },
  //   metadata: { address: metadataAddress }
  // }

  // deploy Metadata
  const Metadata = await hre.ethers.getContractFactory('Metadata')
  const metadata = await Metadata.deploy()
  await metadata.deployed()
  var metadataAddress = metadata.address
  log('Metadata Deployed at ' + String(metadataAddress))

  // deploy DoAW
  const DoAW = await ethers.getContractFactory('DoAW')
  const doaw = await DoAW.deploy(metadataAddress, splitterAddress)
  await doaw.deployed()
  var doawAddress = doaw.address
  log('DoAW Deployed at ' + String(doawAddress) + ` with metadata ${metadataAddress} and splitter ${splitterAddress}`)


  // deploy shaDoAW
  const shaDoAW = await ethers.getContractFactory('shaDoAW')
  const shadoaw = await shaDoAW.deploy(metadataAddress)
  await shadoaw.deployed()
  var shadoawAddress = shadoaw.address
  log('shaDoAW Deployed at ' + String(shadoawAddress) + ` with metadata ${metadataAddress}`)

  // verify contract if network ID is goerli or sepolia
  if (networkinfo['chainId'] == 5 || networkinfo['chainId'] == 1 || networkinfo['chainId'] == 11155111) {
    if (blocksToWaitBeforeVerify > 0) {
      log(`Waiting for ${blocksToWaitBeforeVerify} blocks before verifying`)
      await shadoaw.deployTransaction.wait(blocksToWaitBeforeVerify)
    }

    log('Verifying Metadata Contract')
    try {
      await hre.run('verify:verify', {
        address: metadataAddress,
        constructorArguments: [],
      })
    } catch (e) {
      log({ e })
    }

    // log(`Waiting for ${blocksToWaitBeforeVerify} blocks before verifying`)
    await doaw.deployTransaction.wait(blocksToWaitBeforeVerify)
    log('Verifying DoAW Contract')
    try {
      await hre.run('verify:verify', {
        address: doawAddress,
        constructorArguments: [metadataAddress, splitterAddress],
      })
    } catch (e) {
      log({ e })
    }


    // log(`Waiting for ${blocksToWaitBeforeVerify} blocks before verifying`)
    await shadoaw.deployTransaction.wait(blocksToWaitBeforeVerify)
    log('Verifying shaDoAW Contract')
    try {
      await hre.run('verify:verify', {
        address: shadoawAddress,
        constructorArguments: [metadataAddress],
      })
    } catch (e) {
      log({ e })
    }

  }

  return { doaw, shadoaw, metadata }
}

const log = (message) => {
  const printLogs = process.env.npm_lifecycle_event !== 'test'
  printLogs && console.log(message)
}


function randomHexadecimalAddress() {
  // random hexadecimal number 40 characters long
  const hex = [...Array(40)].map(() => Math.floor(Math.random() * 16).toString(16)).join('')
  return '0x' + hex
}
module.exports = {
  decodeUri,
  initContracts,
  deployContracts,
  getPathABI,
  getPathAddress,
  readData,
  testJson,
  randomHexadecimalAddress,
  correctPrice,
  maxSupply,
  splitterAddress
}
