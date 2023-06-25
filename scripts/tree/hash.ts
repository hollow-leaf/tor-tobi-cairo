import * as starknet from 'starknet'

function main () {
  // starknet pedersen hash
  // console.log(starknet.number.hexToDecimalString('0x06fc4eb5FF02e7E96fB8991A7dfad96D59743BA6B46a58684dcA5318872b9fD7'))
  const starknetHash = starknet.hash.pedersen([10, 10])
  console.log('hex:', starknetHash)
  console.log('dec:', starknet.number.hexToDecimalString(starknetHash))
}

main()
