
import { DirectSecp256k1HdWallet, SigningStargateClient, StargateClient, GasPrice, DirectSecp256k1Wallet, AccountData } from '../src/index';
import { Coin } from 'cosmjs-types/cosmos/base/v1beta1/coin';
import { NftInfo } from '../src/stargate/modules/nft/module';

describe('alpha contract', () => {
  //mnemonics taken from cudos blast default accounts
  const mnemonic1 = 'ordinary witness such toddler tag mouse helmet perfect venue eyebrow upgrade rabbit'
  const mnemonic2 = 'course hurdle stand heart rescue trap upset cousin dish embody business equip'

  const gasPrice = GasPrice.fromString('1acudos');

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

  const rpc = process.argv.filter((x) => x.startsWith('--rpc'))[0].slice(6);
  let faucetWallet: DirectSecp256k1HdWallet;
  let faucetAccount: AccountData;
  let faucetAddress: string;
  let faucet: SigningStargateClient;
  let queryClient: StargateClient;

  let alice: AccountData;

  let newTokenId = 0;

  jest.setTimeout(20000);
  // deploying alpha contract once before test cases
  beforeAll(async () => {
    faucetWallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic1);
    faucetAccount = (await faucetWallet.getAccounts())[0];
    faucetAddress = faucetAccount.address;
    faucet = await SigningStargateClient.connectWithSigner(rpc, faucetWallet);
    queryClient = await StargateClient.connect(rpc);

    alice = (await (await DirectSecp256k1HdWallet.fromMnemonic(mnemonic2)).getAccounts())[0];
    correctDenom.creator = faucetAddress;
    correctToken.owner = faucetAddress;
  })

  // positive test case
  test('issue denom - happy path', async () => {
    await expect(faucet.nftIssueDenom(faucetAddress, correctDenom.id, correctDenom.name, correctDenom.schema, correctDenom.symbol, gasPrice))
      .resolves.not.toThrowError();
    return expect(queryClient.nftModule.getNftDenom(correctDenom.id)).resolves.toEqual({ denom: correctDenom });
  })

  test('issue denom - fail denom id exists', async () => {
    return expect(faucet.nftIssueDenom(faucetAddress, correctDenom.id, correctDenom.name, correctDenom.schema, correctDenom.symbol, gasPrice))
      .rejects.toThrow(`Query failed with (18): failed to execute message; message index: 0: denomID ${correctDenom.id} has already exists: invalid denom: invalid request`);
  })

  test('issue denom - fail invalid denom', async () => {
    return expect(faucet.nftIssueDenom(faucetAddress, 'DenomIdCantStartWithUpperCase', correctDenom.name, correctDenom.schema, correctDenom.symbol, gasPrice))
      .rejects.toThrow(`Invalid denom id - only accepts lowercase alphanumeric characters, and begin with an english letter`);
  })

  test('mint token - happy path', async () => {
    await faucet.nftMintToken(faucetAddress, correctDenom.id, correctToken.name, correctToken.uri, correctToken.data, faucetAddress, gasPrice);
    newTokenId++;
    return expect(queryClient.nftModule.getNftToken(correctDenom.id, correctToken.id)).resolves.toEqual({ nft: correctToken });
  })

  test('mint token - invalid denom id', async () => {
    return expect(faucet.nftMintToken(faucetAddress, 'InvalidDenomId', correctToken.name, correctToken.uri, correctToken.data, faucetAddress, gasPrice))
      .rejects.toThrow(`Invalid denom id - only accepts lowercase alphanumeric characters, and begin with an english letter`);
  })

  test('mint token - fails missing denom id', async () => {
    return expect(faucet.nftMintToken(faucetAddress, 'missingdenomid', correctToken.name, correctToken.uri, correctToken.data, faucetAddress, gasPrice))
      .rejects.toThrow(`Query failed with (18): failed to execute message; message index: 0: not found denomID: missingdenomid: invalid denom: invalid request`);
  })

  test('mint token - fails invalid sender address', async () => {
    return expect(faucet.nftMintToken('invalidAddress', correctDenom.id, correctToken.name, correctToken.uri, correctToken.data, alice.address, gasPrice))
      .rejects.toThrow(`Invalid address`);
  })

  test('edit token - happy path edit name', async () => {
    await expect(faucet.nftEditToken(faucetAddress, correctDenom.id, correctToken.id, 'editedName', correctToken.uri, correctToken.data, gasPrice))
      .resolves.not.toThrowError();
    const editedToken = await queryClient.nftModule.getNftToken(correctDenom.id, correctToken.id);
    return expect(editedToken.nft?.name).toEqual('editedName');
  })

  test('edit token - happy path edit uri', async () => {
    await expect(faucet.nftEditToken(faucetAddress, correctDenom.id, correctToken.id, correctToken.name, 'editedUri', correctToken.data, gasPrice))
      .resolves.not.toThrowError();
    const editedToken = await queryClient.nftModule.getNftToken(correctDenom.id, correctToken.id);
    return expect(editedToken.nft?.uri).toEqual('editedUri');
  })

  test('edit token - happy path edit data', async () => {
    await expect(faucet.nftEditToken(faucetAddress, correctDenom.id, correctToken.id, correctToken.name, correctToken.uri, 'editedData', gasPrice))
      .resolves.not.toThrowError();
    const editedToken = await queryClient.nftModule.getNftToken(correctDenom.id, correctToken.id);
    return expect(editedToken.nft?.data).toEqual('editedData');
  })

  test('transfer token - happy path', async () => {
    await expect(faucet.nftTransfer(faucetAddress, correctDenom.id, correctToken.id, faucetAddress, alice.address, gasPrice))
      .resolves.not.toThrowError();
    const editedToken = await queryClient.nftModule.getNftToken(correctDenom.id, correctToken.id);
    return expect(editedToken.nft?.owner).toEqual(alice.address);
  })

  test('edit token - fails not owner', async () => {
    return expect(faucet.nftEditToken(faucetAddress, correctDenom.id, correctToken.id, correctToken.name, correctToken.uri, 'editedData', gasPrice))
      .rejects.toThrow(`failed to execute message`);
  })

  test('transfer token - fails not owner', async () => {
    return expect(faucet.nftTransfer(faucetAddress, correctDenom.id, correctToken.id, faucetAddress, alice.address, gasPrice))
      .rejects.toThrow(`failed to execute message`);
  })

  test('approve token - happy path', async () => {
    await expect(faucet.nftMintToken(faucetAddress, correctDenom.id, correctToken.name, correctToken.uri, correctToken.data, faucetAddress, gasPrice))
      .resolves.not.toThrowError();

    newTokenId++;
    await expect(faucet.nftApprove(faucetAddress, correctDenom.id, `${newTokenId}`, alice.address, gasPrice))
      .resolves.not.toThrowError();

    const nft = await queryClient.nftModule.getNftToken(correctDenom.id, `${newTokenId}`);

    return expect(nft?.nft?.approvedAddresses).toContain(alice.address);
  })

  test('revoke token - happy path', async () => {
    await expect(faucet.nftRevokeToken(faucetAddress, correctDenom.id, `${newTokenId}`, alice.address, gasPrice))
      .resolves.not.toThrowError();
    const nft = await queryClient.nftModule.getNftToken(correctDenom.id, `${newTokenId}`);

    return expect(nft?.nft?.approvedAddresses).not.toContain(alice.address);
  })

  test('revoke token - fails not approved address', async () => {
    return expect(faucet.nftRevokeToken(faucetAddress, correctDenom.id, `${newTokenId}`, alice.address, gasPrice))
      .rejects.toThrowError('Query failed with (18): failed to execute message; message index: 0: No approved address');
  })

  test('approve all true - happy path', async () => {
    await expect(faucet.nftApproveAll(faucetAddress, alice.address, true, gasPrice))
      .resolves.not.toThrowError();
    return expect(queryClient.nftModule.nftIsApprovedForAll(faucetAddress, alice.address))
      .resolves.toEqual({ isApproved: true });
  })

  test('approve all false - happy path', async () => {
    await expect(faucet.nftApproveAll(faucetAddress, alice.address, false, gasPrice))
      .resolves.not.toThrowError();
    return expect(queryClient.nftModule.nftIsApprovedForAll(faucetAddress, alice.address))
      .resolves.toEqual({ isApproved: false });
  })

  test('burn token - happy path', async () => {
    await expect(queryClient.nftModule.getNftToken(correctDenom.id, `${newTokenId}`))
      .resolves.not.toThrowError();
    await expect(faucet.nftBurnToken(faucetAddress, correctDenom.id, `${newTokenId}`, gasPrice))
      .resolves.not.toThrowError();

    return expect(queryClient.nftModule.getNftToken(correctDenom.id, `${newTokenId}`))
      .rejects.toThrowError('Query failed with (18): invalid NFT');
  })

  test('burn token - fails token not found', async () => {
    return expect(faucet.nftBurnToken(faucetAddress, correctDenom.id, `${newTokenId}`, gasPrice))
      .rejects.toThrowError('Query failed with (18): failed to execute message; message index: 0: not found NFT');
  })

  test('mint token - happy path', async () => {
    const nftInfos: NftInfo[] = [];
    const mintedTokenCount = 10;

    for (let i = 0; i < mintedTokenCount; i++) {
      nftInfos.push(new NftInfo(
        correctDenom.id,
        correctToken.name,
        correctToken.uri,
        correctToken.data,
        faucetAddress
      ))
    }

    await expect(faucet.nftMintMultipleTokens(nftInfos, faucetAddress, gasPrice)).resolves.not.toThrowError();

    for (let i = 0; i < mintedTokenCount; i++) {
      newTokenId += 1;
      correctToken.id = newTokenId.toString();
      await expect(queryClient.nftModule.getNftToken(correctDenom.id, newTokenId.toString())).resolves.toEqual({ nft: correctToken });
    }
  })
})