import { task } from 'hardhat/config'

task('compile:cairo', 'Deploy Cairo0 Contract')
  .addParam('contract')
  .setAction(async ({ contract }, hre) => {
    console.log(hre.starknet.network)
    await hre.run('starknet-compile-deprecated', {
      paths: [`contracts/cairo0/${contract}.cairo`],
    })
  })

task('compile:cairo1', 'Deploy Cairo0 Contract')
  .addParam('contract')
  .setAction(async ({ contract }, hre) => {
    await hre.run('starknet-compile', {
      paths: [`contracts/cairo1/${contract}.cairo`],
      allowedLibfuncsListName: 'experimental_v0.1.0',
      addPythonicHints: true,
    })
  })
