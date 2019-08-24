import React, { Component } from 'react';
import web3 from '../../ethereum/web3';
import Layout from '../../components/Layout';
import ContributeForm from '../../components/ContributeForm';
import { Link } from '../../routes';

import Campaign from '../../ethereum/campaign';
import { Card, Grid, Button } from 'semantic-ui-react';

class CampaignShow extends Component {
  static async getInitialProps(props) {
    const address = props.query.address;
    const campaign = Campaign(address);

    const summary = await campaign.methods.getSummary().call();
    return {
      address: address,
      minimumContribution: summary[0],
      balance: web3.utils.fromWei(summary[1], 'ether'),
      requestsCount: summary[2],
      approversCount: summary[3],
      owner: summary[4]
    };
  }

  renderCards() {
    const {
      minimumContribution,
      balance,
      requestsCount,
      approversCount,
      owner
    } = this.props;

    const items = [
      {
        header: owner,
        meta: 'Contract owner',
        description:
          'The owner created this campaign and can make requests to withdraw funds',
        style: { overflowWrap: 'break-word' }
      },
      {
        header: `${minimumContribution} wei`,
        meta: 'Minimum contribution',
        description: `A contributor must contribute at least ${minimumContribution} wei to this campaign to become an approver`,
        style: { overflowWrap: 'break-word' }
      },
      {
        header: requestsCount,
        meta: 'Number of requests',
        description:
          'Number of requests to withdraw money from the contract.  All requests must be approved before a withdrawal can occur',
        style: { overflowWrap: 'break-word' }
      },
      {
        header: approversCount,
        meta: 'Number of approvers',
        description:
          'Number of contributors that have made the minimum contribution to this contract',
        style: { overflowWrap: 'break-word' }
      },
      {
        header: `${balance} ether`,
        meta: 'Contract balance',
        description:
          'The sum of all contributions to the contract minus finalized approved expenses',
        style: { overflowWrap: 'break-word' }
      }
    ];

    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>
        <h3>Show Campaign</h3>
        <Grid>
          <Grid.Row>
            <Grid.Column width={10}>{this.renderCards()}</Grid.Column>
            <Grid.Column width={5}>
              <ContributeForm address={this.props.address} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Link route={`/campaigns/${this.props.address}/requests`}>
                <a>
                  <Button primary>View Requests</Button>
                </a>
              </Link>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Layout>
    );
  }
}

export default CampaignShow;
