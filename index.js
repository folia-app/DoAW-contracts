
const DoAWABI = require('./contractMetadata/ABI-sepolia-DoAW.json')
const DoAW = require('./contractMetadata/homestead-DoAW.json')
const DoAWSepolia = require('./contractMetadata/sepolia-DoAW.json')


const shaDoAWABI = require('./contractMetadata/ABI-sepolia-shaDoAW.json')
const shaDoAW = require('./contractMetadata/homestead-shaDoAW.json')
const shaDoAWSepolia = require('./contractMetadata/sepolia-shaDoAW.json')


const MetadataABI = require('./contractMetadata/ABI-sepolia-Metadata.json')
const Metadata = require('./contractMetadata/homestead-Metadata.json')
const MetadataSepolia = require('./contractMetadata/sepolia-Metadata.json')

const { merkleAddresses } = require('./merkleAddresses.js')

module.exports = {
  merkleAddresses,
  DoAW: {
    abi: DoAWABI.abi,
    networks: {
      '1': DoAW,
      'homestead': DoAW,
      'mainnet': DoAW,
      '11155111': DoAWSepolia,
      'sepolia': DoAWSepolia,
    },
  },
  shaDoAW: {
    abi: shaDoAWABI.abi,
    networks: {
      '1': shaDoAW,
      'homestead': shaDoAW,
      'mainnet': shaDoAW,
      '11155111': shaDoAWSepolia,
      'sepolia': shaDoAWSepolia,
    },
  },
  Metadata: {
    abi: MetadataABI.abi,
    networks: {
      '1': Metadata,
      'homestead': Metadata,
      'mainnet': Metadata,
      '11155111': MetadataSepolia,
      'sepolia': MetadataSepolia,
    },
  }
}