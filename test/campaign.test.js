const assert = require('assert');
const chai = require('chai');
const Web3 = require('web3');
const provider = new Web3.providers.WebsocketProvider('ws://127.0.0.1:7545');
const web3 = new Web3(provider);

const campaignFactoryContract = require('../ethereum/build/CampaignFactory.json');
const abi_campaignfactory = campaignFactoryContract.abi;
const bytecode_campaignfactory = campaignFactoryContract.evm.bytecode.object;

const campaignContract = require('../ethereum/build/Campaign.json');
const abi_campaign = campaignContract.abi;

let accounts;
let factory;
let campaignAddress;
let campaign;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  factory = await new web3.eth.Contract(abi_campaignfactory)
    .deploy({ data: bytecode_campaignfactory })
    .send({ from: accounts[0], gas: '33669217' });

  await factory.methods
    .createCampaign('100')
    .send({ from: accounts[0], gas: '33669217' });

  [campaignAddress] = await factory.methods
    .getDeployedCampaigns()
    .call({ from: accounts[0] });

  campaign = await new web3.eth.Contract(abi_campaign, campaignAddress);
});

describe('Campaigns', () => {
  it('Deploys a factory and campaign', async () => {
    assert.ok(factory.options.address);
    assert.ok(campaign.options.address);
  });

  it('has owner as accounts[0]', async () => {
    const owner = await campaign.methods.owner().call();

    assert.equal(
      accounts[0],
      owner,
      'Accounts[0] is not the owner of the contract'
    );
  });

  it('can accept money as payment, and assign the payer as an approver', async () => {
    const payer = accounts[1];

    await campaign.methods.contribute().send({ from: payer, value: '100' });
    const countOfApproversResult = await campaign.methods
      .countOfApprovers()
      .call();
    const approverFound = await campaign.methods
      .approvers(payer)
      .call({ from: payer });

    assert.equal(
      countOfApproversResult,
      1,
      'The count of approvers does not equal one.'
    );
    chai.assert.isTrue(approverFound, 'Accounts[1] is not an approver');
  });

  it('requires a minimum contribution in order for an address to be promoted to an approver', async () => {
    const payer = accounts[2];

    try {
      await campaign.methods.contribute().send({ from: payer, value: '99' });
      assert(false);
    } catch (error) {
      assert(error); // asserts that we do have an error, which in this case is what we want
    }
  });

  it('allows the owner to create a request', async () => {
    const owner = accounts[0];
    const recipient = accounts[9];
    await campaign.methods
      .createRequest('Test request', 5, recipient)
      .send({ from: owner, gas: '33669217' });
    const request = await campaign.methods.requests(0).call();
    assert(request, 'No request was recorded');
  });

  it('can accept contributions, owner can make request, approvers can approve request, and request can be finalized', async () => {
    const owner = accounts[0];
    const recipient = accounts[9];

    const beginBalance = await web3.eth.getBalance(recipient);

    await campaign.methods
      .contribute()
      .send({ from: accounts[1], value: '100', gas: '33669217' });
    await campaign.methods
      .contribute()
      .send({ from: accounts[2], value: '100', gas: '33669217' });
    await campaign.methods
      .contribute()
      .send({ from: accounts[3], value: '100', gas: '33669217' });
    await campaign.methods
      .createRequest('Test request', 5, recipient)
      .send({ from: owner, gas: '33669217' });
    await campaign.methods
      .approveRequest(0)
      .send({ from: accounts[1], gas: '33669217' });
    await campaign.methods
      .approveRequest(0)
      .send({ from: accounts[2], gas: '33669217' });
    await campaign.methods
      .finalizeRequest(0)
      .send({ from: owner, gas: '33669217' });

    const endBalance = await web3.eth.getBalance(recipient);

    assert(endBalance > beginBalance, 'No money was transferred to recipient')
  });
});
