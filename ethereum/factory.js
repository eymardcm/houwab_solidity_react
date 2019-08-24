import web3 from './web3';
import campaignFactoryContract from './build/CampaignFactory.json';
const abi_campaignfactory = campaignFactoryContract.abi;

const instance = new web3.eth.Contract(
  abi_campaignfactory,
  '0xD900617ef7eaFC9BDac6C53a382b7ca3C643c6D8'
);

export default instance;
