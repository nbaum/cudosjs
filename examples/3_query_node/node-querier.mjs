import { CosmWasmClient } from "@nikolakterziev/cudosjs"
    
import * as cfg  from 'dotenv';
  
  cfg.config();  
  // Create connection to DataHub Secret Network node
  const client = await CosmWasmClient.connect(process.env.NODE_URL)

  // 1. Query height
  const height = await client.getHeight();
  console.log(`Height: ${height}`);

  // 2. Get block at specific height
  const block = await client.getBlock(1);
  console.log(`First block: ${JSON.stringify(block)}`);

  // 3 Query account
  const account = await client.getAccount(process.env.ADDRESS)
  console.log('Account: ', account);    

  // 4. Check balance
  const balance = await client.getBalance(process.env.ADDRESS, "acudos");
  console.log(`Balance of address ${process.env.ADDRESS}: ${JSON.stringify(balance)}`);
    
  