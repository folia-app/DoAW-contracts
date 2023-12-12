const { initContracts } = require('./utils')

async function main() {
  const { doaw } = await initContracts()
  const premints = [
    {
      name: 'joan',
      address: '0xB113A7b59e7CD692e2CD5cC50ED14eA0B7a230e4',
      entropies: [
        // {
        //   words: 'dutch key fiction document security pair limb home genuine casino space purse',
        //   hex: '446f4157203c2d3e20736861446f4157', // DoAW <-> shaDoAW
        // },
        // {
        //   words: 'inflict drink extra teach betray mosquito vague pond cake casino space purchase',
        //   hex: '736861446f4157203c2d3e20446f4157', // shaDoAW <-> DoAW
        // },
        // {
        //   words: 'embody clock brand tattoo search desert saddle eternal goddess amount abandon accuse',
        //   hex: '48656c6c6f2c20776f726c6421000000', // Hello, world!
        // },
        // {
        //   words: 'comfort across orange security tilt category night pumpkin inflict forest frame strategy',
        //   hex: '2e204a6f616e204865656d736b65726b', // . Joan Heemskerk
        // },
        // {
        //   words: 'atom orbit quantum gravity engine bracket dynamic volume inflict average angle cycle',
        //   hex: '0e537ebd3304a6359137ae7361f8231b',
        // },
        // {
        //   words: 'modify style ill artefact system useful quick art artist artwork exhibit museum',
        //   hex: '8ebaf9c3867dcddfebe8660d01a53e48',
        // },
        // {
        //   words: 'color blue green yellow brown pink gold silver copper iron metal canvas',
        //   hex: '2da309997f81d14a1916462feeca3010',
        // },
        // {
        //   words: 'hidden either broken then order six else width above jazz setup twelve',
        //   hex: '6b68e0727019c393920fd6008eef1275',
        // },
        // {
        //   words: 'team blur chunk during someone rabbit laugh outdoor pudding item segment ripple',
        //   hex: 'dea30ca2a21cf1605f64e9ad2edb0cdd'
        // },
        // {
        //   words: 'hungry pioneer inside sand key gossip metal scene team immense fence drum',
        //   hex: '6f54a5d4df97a0c9e30604deae315421',
        // },
        // {
        //   words: 'deny ten link ice lift web first virus letter surface burst target',
        //   hex: '3abbde08381817f195dfa4809b447b6e',
        // },
        // {
        //   words: 'wear outdoor february syrup hungry depth coconut document total gloom tide audit',
        //   hex: 'f873a5516e56f4764b3a03e5cc6f8707',
        // },
        // {
        //   words: 'tackle shoulder pumpkin sustain tired inside virtual captain gown quantum fun boss',
        //   hex: 'dd18deb6ed7e2aea7d19116535e9780d',
        // },
        // {
        //   words: 'inside horse festival clown catch another rose leave solar confirm unit mistake',
        //   hex: '752db954960240132f03f7ce65dfb6c6',
        // },
        // {
        //   words: 'network rescue globe buzz knock major turn pill model field since illegal',
        //   hex: '94d6e58d0fc7bd0cfab5268e8abf24b8',
        // },
        // {
        //   words: 'receive hurry rain enhance shrimp borrow insect wasp tiger noble dose honey',
        //   hex: 'b38df6c4254c72341d47bce1f2b50636',
        // },
        // {
        //   words: 'fiber eye vital vehicle track fragile below obscure text drive biology license',
        //   hex: '55aa27d478fe68b8c534c2dfa86859c0',
        // },
        // {
        //   words: 'word word word word word word word word word word word word',
        //   hex: 'fd7faff5febfd7faff5febfd7faff5fe',
        // },
        // {
        //   words: 'screen screen screen screen screen screen screen screen screen screen screen screen',
        //   hex: 'c198330660cc198330660cc198330660',
        // },
        // {
        //   words: 'abandon math mimic master filter design carbon crystal rookie group knife young',
        //   hex: '00112233445566778899aabbccddeeff',
        // },
        // {
        //   words: 'cake battle force suggest must circle noble soccer grace force forget ticket',
        //   hex: '2042696c6c792052656e6e656b616d70', // billy rennekamp
        // },
      ]
    },
    {
      name: 'billy',
      address: '0xFa398d672936Dcf428116F687244034961545D91',
      entropies: [
        // {
        //   words: 'rude',
        // },
        // {
        //   words: 'cute',
        // },
        // {
        //   words: 'beef',
        // },
        // {
        //   words: 'mom',
        // },
        // {
        //   words: 'index',
        // },
        // {
        //   words: 'jeans',
        // },
        // {
        //   words: 'proof',
        // },
        // {
        //   words: 'sheriff',
        // },
        // {
        //   words: 'sunny',
        // },
        // {
        //   words: 'bus',
        // },
        // {
        //   words: 'awesome',
        // },
        // {
        //   words: 'audit',
        // },
        // {
        //   words: 'announce',
        // },
        // {
        //   words: 'all',
        // },
      ]
    },
    {
      name: 'ev',
      address: '0xb5bb9A125c2F67F1F2cd9d8992955bb209490aFE',
      entropies: [
        // {
        //   words: 'escape',
        // },
        // {
        //   words: 'more',
        // },
        // {
        //   words: 'morning',
        // },
        // {
        //   words: 'very',
        // },
        // {
        //   words: 'else',
        // },
        // {
        //   words: 'life',
        // },
        // {
        //   words: 'peasant',
        // },
        // {
        //   words: 'evolve',
        // },
        // {
        //   words: 'later',
        // },
        // {
        //   words: 'obvious',
        // },
        // {
        //   words: 'exercise',
        // },
        // {
        //   words: 'valid',
        // },
        // {
        //   words: 'real',
        // }
      ]
    },
    {
      name: 'dan',
      address: '0x4be96B6177A27946aAF1C4B203674C9079C2fD61',
      entropies: [
        // {
        //   words: 'sell',
        // },
        // {
        //   words: 'yellow',
        // },
        // {
        //   words: 'seven',
        // },
        // {
        //   words: 'oil',
        // },
        // {
        //   words: 'illegal',
        // },
        // {
        //   words: 'invest',
        // },
        // {
        //   words: 'question',
        // },
        // {
        //   words: 'business',
        // },
        // {
        //   words: 'virtual',
        // },
        // {
        //   words: 'world',
        // },
      ]
    },

  ]

  const shouldBe = {
    'joan': 0,//21,
    'dan': 40,
    'ev': 0,
    'billy': 0,
  }

  let nonce = 174

  for (let i = 0; i < premints.length; i++) {
    const premint = premints[i]
    if (premint.entropies.length !== shouldBe[premint.name]) {
      console.log('add to dan')
      const missing = shouldBe[premint.name] - premint.entropies.length
      for (let j = 0; j < missing; j++) {
        const hex = ethers.utils.hexlify(ethers.utils.randomBytes(16))
        const words = ethers.utils.entropyToMnemonic(hex)
        premint.entropies.push({ hex: hex.replace('0x', ''), words })
      }
    }
    if (premint.entropies.length !== shouldBe[premint.name]) {
      throw new Error(`premint ${premint.name} has ${premint.entropies.length} entropies, but should have ${shouldBe[premint.name]}`)
    }
    for (let j = 0; j < premint.entropies.length; j++) {
      const entropy = premint.entropies[j]
      let hex
      if (!entropy.hex) {
        const mnemonic = (entropy.words + ' ').repeat(12).trim()
        hex = ethers.utils.mnemonicToEntropy(mnemonic)
        // console.log({ hex })
      } else {
        hex = ethers.utils.hexZeroPad('0x' + entropy.hex, 16)
        const menmonic = ethers.utils.entropyToMnemonic(hex)
        if (menmonic !== entropy.words) {
          throw new Error(`hex doesn't match entropy for ${premint.name} ${j} ${entropy.hex} ${menmonic} ${entropy.words}`)
        }
      }
      entropy.hex = hex
    }
    if (premint.address === '') {
      throw new Error(`premint ${premint.name} address is empty`)
    }
    console.log(`preminting ${premint.name}'s ${premint.entropies.length} tokens`)
    const hexes = premint.entropies.map(e => e.hex)

    const chunkSize = 10
    const hexesChunks = []
    for (let i = 0; i < hexes.length; i += chunkSize) {
      const chunk = hexes.slice(i, i + chunkSize)
      hexesChunks.push(chunk)
    }

    // // Add remaining hexes to the end of hexesChunks
    // if (hexes.length % chunkSize !== 0) {
    //   const remainingHexes = hexes.slice(hexesChunks.length * chunkSize)
    //   hexesChunks.push(remainingHexes)
    // }

    if (hexesChunks.flat().length !== hexes.length) {
      throw new Error('hexesChunks length doesn\'t match hexes length')
    }

    for (const hexesChunk of hexesChunks) {
      console.log(`minting ${hexesChunk.length} tokens for ${premint.name}`)
      // console.log({ hexesChunk })
      const tx = await doaw['adminMint(address,uint256,uint256[])'](premint.address, hexesChunk.length, hexesChunk, {
        nonce
      })
      nonce++
      console.log({ tx })
      await tx.wait()
    }

    // const tx = await doaw['adminMint(address,uint256,uint256[])'](premint.address, premint.entropies.length, hexes)
    // console.log({ tx })
    // await tx.wait()
  }
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
