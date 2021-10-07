import { CosmWasmClient } from '@nikolakterziev/cudosjs'


const main = async () => {
  // Create connection to DataHub Secret Network node
  const client = await CosmWasmClient.connect(process.env.NODE_URL)

  // Query chain ID
  const chainId = await client.getChainId()

  // Query chain height
  const height = await client.getHeight()

  console.log("ChainId:", chainId);
  console.log("Block height:", height);

  console.log('Successfully connected to Cudos Network');
}

main().then(resp => {
  console.log(resp);
}).catch(err => {
  console.log(err);
})
