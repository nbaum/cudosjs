/* eslint-disable object-curly-newline */
module.exports.config = {
    addressPrefix: 'cudos',
    gasPrice: '1acudos',
    rustOptimizerVersion: '0.12.6',
  
    // optional parameners
    additionalAccounts: 5,
    customAccountBalances: 1000000000000000000,
    networks: {
      local: 'http://localhost:26657',
      local_devcontainer: `http://host.docker.internal:26657`,
      testnet: 'https://sentry1.gcp-uscentral1.cudos.org:36657',
    }
}