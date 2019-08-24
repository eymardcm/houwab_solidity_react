import React, { Component } from 'react';
import { Table, Button } from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import Campaign from '../ethereum/campaign';

class RequestRow extends Component {
  state = {
    approving: false,
    finalizing: false
  };

  onApprove = async () => {
    this.setState({ approving: true });
    try {
      const ethereum = window.ethereum;
      await ethereum.enable();
      const accounts = await web3.eth.getAccounts();

      const campaign = Campaign(this.props.address);
      await campaign.methods
        .approveRequest(this.props.id)
        .send({ from: accounts[0] });
      //   this.setState({ success: true });
      //   setTimeout(() => {
      //     Router.pushRoute(`/campaigns/${this.props.address}/requests`);
      //   }, 1000);
    } catch (error) {}

    this.setState({ approving: false });
  };

  onFinalize = async () => {
    this.setState({ finalizing: true });
    try {
      const ethereum = window.ethereum;
      await ethereum.enable();
      const accounts = await web3.eth.getAccounts();
      const campaign = Campaign(this.props.address);
      await campaign.methods
        .finalizeRequest(this.props.id)
        .send({ from: accounts[0] });
    } catch (error) {}

    this.setState({ finalizing: false });
  };

  render() {
    const { Row, Cell } = Table;
    const { id, request, approversCount } = this.props;
    const readyToFinalize = request.voteCount >= request.consensusTarget

    return (
      <Row disabled={request.complete} positive={readyToFinalize && !request.complete}>
        <Cell>{id}</Cell>
        <Cell>{request.description}</Cell>
        <Cell>{web3.utils.fromWei(request.value, 'ether')} Ether</Cell>
        <Cell>{request.recipient}</Cell>
        <Cell>
          Recvd: {request.voteCount}/Req: {request.consensusTarget}/Total:{' '}
          {approversCount}
        </Cell>
        <Cell>
          {request.isApproved ? null : (
            <Button
              loading={this.state.approving}
              color="green"
              basic
              onClick={this.onApprove}
            >
              Approve
            </Button>
          )}
        </Cell>
        <Cell>
          {request.complete ? null : (
            <Button
              loading={this.state.finalizing}
              color="purple"
              basic
              onClick={this.onFinalize}
            >
              Finalize
            </Button>
          )}
        </Cell>
      </Row>
    );
  }
}

export default RequestRow;
