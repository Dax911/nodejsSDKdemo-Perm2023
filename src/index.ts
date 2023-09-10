import { MetaMaskSDK, MetaMaskSDKOptions } from '@metamask/sdk';

const { AutoComplete } = require('enquirer');

const optActions = async () => {
  const prompt = new AutoComplete({
    name: 'optActions',
    message: 'What do you want to do?',
    limit: 10,
    choices: [
      'getAccounts',
      'getChainId',
      'getNetworkId',
      'getBalance',
      'getTransactionHistory',
      'signMessage',
      'sendTransaction'
    ]
  });

  const answer = await prompt.run();
  return answer;
};



const qrcode = require('qrcode-terminal');

const options: MetaMaskSDKOptions = {
  shouldShimWeb3: false,
  dappMetadata: {
    name: 'NodeJS Demo',
    url: process.env.DAPP_URL || 'http://localhost:3000',
  },
  logging: {
    sdk: false,
  },
  checkInstallationImmediately: false,
  // Optional: customize modal text
  modals: {
    install: ({ link }) => {
      qrcode.generate(link, { small: true }, (qr) => console.log(qr));
      return {};
    },
    otp: () => {
      return {
        mount() {},
        updateOTPValue: (otpValue) => {
          if (otpValue !== '') {
            console.debug(
              `[CUSTOMIZE TEXT] Choose the following value on your metamask mobile wallet: ${otpValue}`,
            );
          }
        },
      };
    },
  },
};

const sdk = new MetaMaskSDK(options);



const msgParams = {
  types: {
    EIP712Domain: [
      { name: 'name', type: 'string' },
      { name: 'version', type: 'string' },
      { name: 'chainId', type: 'uint256' },
      { name: 'verifyingContract', type: 'address' },
    ],
    Person: [
      { name: 'name', type: 'string' },
      { name: 'wallet', type: 'address' },
    ],
    Mail: [
      { name: 'from', type: 'Person' },
      { name: 'to', type: 'Person' },
      { name: 'contents', type: 'string' },
    ],
  },
  primaryType: 'Mail',
  domain: {
    name: 'Ether Mail',
    version: '1',
    chainId: '0xe704',
    verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
  },
  message: {
    from: {
      name: 'Cow',
      wallet: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
    },
    to: {
      name: 'Bob',
      wallet: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
    },
    contents: 'Hello, Bob!',
  },
};

/*
const start = async () => {
  console.debug(`start NodeJS example`);

  const accounts = await sdk.connect();
  console.log('connect request accounts', accounts);

  const ethereum = sdk.getProvider();

  ethereum.on('_initialized', async () => {
    const { method, params } = await optActions();

    if (method) { // Check if method is defined
      const result = await ethereum.request({ method, params });
      console.log(`${method} result:`, result);
    } else {
      console.error("Invalid or empty method.");
    }

    console.log('DONE');
  });
};
*/

const start = async () => {
  console.debug(`start NodeJS example`);

  // Prompt the user for their choice
  const selectedAction = await optActions();
  const account = await sdk.connect();
  const ethereum = sdk.getProvider();

  console.log('Selected Action:', selectedAction);

  // Dynamically determine the method and params based on the selected action
  let method = '';
  let params = [];

  if (selectedAction === 'getAccounts') {
    method = 'eth_accounts';
  } else if (selectedAction === 'getChainId') {
    method = 'eth_chainId';
  } else if (selectedAction === 'sendTransaction') {
    method = 'eth_sendTransaction';
    // You can set the transaction parameters here
    params = [
      {
        from: '0xYourSenderAddress',
        to: '0xb8fe6d846c9b758320e9aa77172a1045cb97038c',
        value: '0x12345', // Amount in Wei
        gas: '0x12345' // Gas limit
      }
    ];
  } else if (selectedAction === 'getBalance') {
    method = 'eth_getBalance'; // Use the appropriate method for getting balance
    params = [
      account, // Replace with the address you want to check
      'latest' // Replace with the block parameter
    ];
  }

  console.log('Determined method:', method);
  console.log('Params:', params);

  console.log('Now attempting ethereum.request: ', method);
  ethereum.on('_initialized', async () => {
    //const { method, params } = await optActions();
    const accounts = await sdk.connect();
    console.log('Completing attempt on Wallet Address: ', accounts);
    // Check if method is defined
      const result = await ethereum.request({ method, params });
      console.log(`${method} result:`, result);

    console.log('DONE');
  });

  // Now you can use the selected action and its corresponding method and params
};


start().catch((err) => {
  console.error(err);
});
