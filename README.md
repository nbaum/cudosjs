<p align="center" >
  <a href="https://www.cudos.org/" target="_blank"><img width="100" src="logo.png" alt="logo"></a>
</p>
<h1 align="center">
    CudosJS - JavaScript Library for the Cudos network
</h1>

*:star: Developed by [Cudos](https://www.cudos.org/)*

A JavasSript Open Source Library for [Cudos](https://cudos.org/) network.


## Installation

In order to fully use this library, you need to run a local or remote full node and set up its rest server, which acts as an intermediary between the front-end and the full-node. You can use the [cudos-cli](github.com/CudoVentures/cudos-cli).

### NPM

```bash
npm install cudosjs
```

### Yarn 

```bash
yarn add cudosjs
```

## Using CudosJS

CudosJS acts as a package that extends the [cosmJS](https://github.com/cosmos/cosmjs) library. It builds-up upon it, so that it's tailored to the specifics of the Cudos Network. If you've used [cosmJS](https://github.com/cosmos/cosmjs) before, than the API should feel quite familiar to you.

CudosJS usage is organized mainly around using it's two clients - `StargateClient` and 
`SigningStargateClient`. 

- `SigningStargateClient` - used to sign and broadcast transactions.

```
import { SigningStargateClient, DirectSecp256k1HdWallet } from "cudosjs"

// Load an account
const mnemonic = "surround miss nominee dream gap cross assault thank captain prosper drop duty group";
const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic);
const [firstAccount] = await wallet.getAccounts();

const rpc = http://localhost:26657
const signingClient = await SigningStargateClient.connectWithSigner(rpc, wallet)
```
We need an RPC endpoint (that will be used to connect to the network) and a wallet ( used to sign the transactions ). A ready to use SigningStargateClient is created by connecting it to the RPC and the wallet. 

```
// Sending tokens to another cudos address
import { coin, GasPrice } from "cudosjs"

...

const recipient = "cudos1a0kjzmvrkul70nxle63j8day47ve74g00zl66w";
const amount = {           // same as const amount = coin("1234567", "acudos)
  denom: "acudos",
  amount: "1234567",
};

const result = await signingClient.sendTokens(firstAccount.address, recipient, [amount], "Have fun with your cudos coins");

assertIsBroadcastTxSuccess(result);

```
 
```
...
// Sending a message to the NFT module


const gasPrice = GasPrice.fromString('1acudos');

const correctToken = {
    approvedAddresses: [],
    id: '1',
    owner: '',
    name: 'testToken',
    uri: 'testUir',
    data: 'testData',
  }

const result = await signingClient.nftMintToken(firstAccount.address, correctDenom.id, correctToken.name, correctToken.uri, correctToken.data, recipient, gasPrice)

assertIsBroadcastTxSuccess(result);
```

```
...
// Sending a message to the Gravity module


const gasPrice = GasPrice.fromString('1acudos');
const coinAmount = {denom:"acudos", amount: "1000"}
const feeAmount = {denom:"acudos", amount: "100"}
const ethAddr = "0xa677d7229924af63098b9bb70b041a03a1ec7d8c"

const result = await signingClient.gravitySendToEth(firstAccount.address,ethAddr,coinAmount,feeAmount,gasPrice)

assertIsBroadcastTxSuccess(result);
```


- `StargateClient` - this one is used to query the Cudos Network. It's quite simple to work with:

```
import { StargateClient } from "cudosjs"

const rpc = http://localhost:26657
const queryClient = await StargateClient.connect(rpc)
```

First we need an RPC endpoint, that will be used to connect to the network. Then a `StargateClient` is created by connecting it to the network.

** In this example the client is connecting to a local test network, created using [cudos-blast](https://github.com/CudoVentures/cudos-blast).

```
...

const cudosAddress = "some cudos address"

const height = await queryClient.getHeight() // returns the current height of the blockchain  

const isAccount = await queryClient.getAccount(cudosAddress) // check if an account exists

const balance = await queryClient.getBalance(cudosAddress, "acudos") // get the balance of the account in the respective denom

const chainId =  await queryClient.getChainId()
...
```



As shown above - query methods typical to any cosmos-based blockchain are directly available on the `StargateClient`

The Cudos Network however includes some specific, additional modules - each with it's distinct messages and queries ( such examples are the group, nft and gravity modules). Methods for queries related to those module are grouped in objects inside the `StargateClient`, where each object starts with the name of the module (e.g.`nftModule`, `gravityModule`, `groupModule`):


```
// Querying the Nft Module
...
 const correctDenom = {
    creator: '',
    id: 'testdenom',
    name: 'test-denom-name',
    symbol: 'test-denom-symbol',
    schema: 'test-denom-schema',
  }

const correctToken = {
    approvedAddresses: [],
    id: '1',
    owner: '',
    name: 'testToken',
    uri: 'testUir',
    data: 'testData',
  } 

const getDenom = await queryClient.nftModule.getNftDenom(correctDenom.id) // get a denom by it's ID
const getToken = queryClient.nftModule.getNftToken(correctDenom.id, correctToken.id) // get a token
const isApproved = queryClient.nftModule.nftIsApprovedForAll(cudosAddress, cudosAddress2)

```

```
// Querying the Gravity Module
...

const pendingTrxs = await queryClient.gravityModule.getPendingSendToEth(cudosAddress) // check for unbatched transactions for a particular account

```
### Constructing custom Msg's
Most of the times the already provided methods inside `SigningStargateClient` would be enough. But sometimes you need to construct and send your messages manually ( for example when simulating a transaction to calculate the Fees). CudosJS provides an utility function `generateMsg` to make custom message construction easier:
```
import { GasPrice, generateMsg, estimateFee } from "cudosjs"

...

// Calculating the Fees for sending a msgSendToEth message.

const bridgeFee = {denom:"acudos", amount: "10000"}
const amount = coin('1000000000000', "acudos")
const memo = "Have fun spending your cudos"


const gasPrice = GasPrice.fromString(`1acudos`)
const simulatedMsg = generateMsg('msgSendToEth', {
            sender,  // cudos addrs
            ethDest: destination, //eth addrs
            amount
            bridgeFee
        })

const approxFee = await estimateFee(client, sender, [simulatedMsg], gasPrice, gasMultiplier, memo)


const result = await client.signAndBroadcast(
  sender,
  [simulatedMsg],
  approxFee,
  memo
);
```

### Custom Queries
Using the available methods inside `StargateClient` automatically decodes the response. However when constructing and sending queries yourself, you have to decode the responses as well. You can use the `decodeQryResponse` method inside `StargateClient`:

```
...

// Executing a custom query using filters

const filteredTx = await queryClient.searchTx({
                tags: [{ key: "message.action", value: "/gravity.v1.MsgSendToCosmosClaim" }],
            })

// Decoding the result - decodes all messages inside the response

const decodedRes = await qClient.decodeQryResponse(filteredTx)
```
