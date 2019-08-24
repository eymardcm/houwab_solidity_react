import React, { Component } from 'react';
import Layout from '../../../components/Layout';
import { Form, Button, Message, Input } from 'semantic-ui-react';
import Campaign from '../../../ethereum/campaign';
import web3 from '../../../ethereum/web3';
import { Link, Router } from '../../../routes';

class RequestNew extends Component {
  state = {
    value: '',
    description: '',
    recipient: '',
    errorMessage: '',
    success: false,
    loading: false
  };
  static async getInitialProps(props) {
    const { address } = props.query;
    return { address };
  }

  onSubmit = async () => {
    event.preventDefault;

    const campaign = Campaign(this.props.address);
    const { description, value, recipient } = this.state;

    this.setState({ loading: true, errorMessage: '' });

    try {
      const ethereum = window.ethereum;
      await ethereum.enable();
      const accounts = await web3.eth.getAccounts();
      await campaign.methods
        .createRequest(description, web3.utils.toWei(value, 'ether'), recipient)
        .send({ from: accounts[0] });
      this.setState({ success: true });
      setTimeout(() => {
        Router.pushRoute(`/campaigns/${this.props.address}/requests`);
      }, 1000);
    } catch (error) {
      this.setState({ errorMessage: error.message });
    }

    this.setState({ loading: false });
  };

  render() {
    return (
      <Layout>
        <Link route={`/campaigns/${this.props.address}/requests`}>
          <a>
            Back to Requests List
          </a>
        </Link>
        <h3>Make a Request Page</h3>
        <Form
          onSubmit={this.onSubmit}
          error={!!this.state.errorMessage}
          success={this.state.success}
        >
          <Form.Field>
            <label>Description</label>
            <Input
              value={this.state.description}
              onChange={event =>
                this.setState({ description: event.target.value })
              }
            />
          </Form.Field>
          <Form.Field>
            <label>Value</label>
            <Input
              label="Ether"
              labelPosition="right"
              value={this.state.value}
              onChange={event => this.setState({ value: event.target.value })}
            />
          </Form.Field>
          <Form.Field>
            <label>Recipient</label>
            <Input
              value={this.state.recipient}
              onChange={event =>
                this.setState({ recipient: event.target.value })
              }
            />
          </Form.Field>
          <Message error header="Ooops!" content={this.state.errorMessage} />
          <Message
            success
            header="Success"
            content="Your request has been submitted for approval."
          />
          <Button primary loading={this.state.loading}>
            Submit
          </Button>
        </Form>
      </Layout>
    );
  }
}

export default RequestNew;
