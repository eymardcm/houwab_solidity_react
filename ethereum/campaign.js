import web3 from './web3';
import campaignContract from './build/Campaign.json';
const abi_campaign = campaignContract.abi;

export default address => {
  return  new web3.eth.Contract(
    abi_campaign,
    address
  );
};
