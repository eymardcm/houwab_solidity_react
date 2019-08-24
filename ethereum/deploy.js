const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const campaignFactoryContract = require('../ethereum/build/CampaignFactory.json');
const abi_campaignfactory = campaignFactoryContract.abi;
const bytecode_campaignfactory = campaignFactoryContract.evm.bytecode.object;

const provider = new HDWalletProvider(
  'craft field agent judge receive adult exile sound grid vendor section erode',
  'https://rinkeby.infura.io/v3/dd1c8997dc824a27a22038472b3b1ea0'
);

// const result = await new web3.eth.Contract(
//   JSON.parse(compiledFactory.interface)
// )
//   .deploy({ data: '0x' + compiledFactory.bytecode }) // add bytecode
//   .send({ from: accounts[0] });

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  const result = await new web3.eth.Contract(abi_campaignfactory)
    .deploy({ data: '0x' + bytecode_campaignfactory }) // add bytecode
    .send({ from: accounts[0] });

  const contractAddress = result.options.address;
  console.log('Contract Address', contractAddress);
};
deploy();
