import React, { Component } from 'react';
import { Form, Input, Message, Button } from 'semantic-ui-react';
import Campaign from '../ethereum/campaign';
import web3 from '../ethereum/web3';

import { Router } from '../routes';

class ContributeForm extends Component {
  state = {
    value: '',
    errorMessage: '',
    success: false,
    loading: false
  };

  onSubmit = async event => {
    event.preventDefault();

    this.setState({ loading: true, errorMessage: '', success: false });

    const campaign = Campaign(this.props.address);

    try {
      const ethereum = window.ethereum;
      await ethereum.enable();
      const accounts = await web3.eth.getAccounts();
      await campaign.methods
        .contribute()
        .send({
          from: accounts[0],
          value: web3.utils.toWei(this.state.value, 'ether')
        });
      this.setState({ success: true });
      setTimeout(() => {
        Router.replaceRoute(`/campaigns/${this.props.address}`);
      }, 1000);
    } catch (error) {
      this.setState({ errorMessage: error.message });
    }

    this.setState({ loading: false, value: '' });
  };

  render() {
    return (
      <Form
        onSubmit={this.onSubmit}
        error={!!this.state.errorMessage}
        success={this.state.success}
      >
        <Form.Field>
          <label>Amount to Contribute</label>
          <Input
            label="ether"
            labelPosition="right"
            value={this.state.value}
            onChange={event => this.setState({ value: event.target.value })}
          />
        </Form.Field>
        <Message error header="Ooops" content={this.state.errorMessage} />
        <Message
          success
          header="Success"
          content="The transaction completed successfully."
        />
        <Button loading={this.state.loading} primary>
          Contribute!
        </Button>
      </Form>
    );
  }
}

export default ContributeForm;
