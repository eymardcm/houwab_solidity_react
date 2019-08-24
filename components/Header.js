import React from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from '../routes';

export default () => {
  return (
    <Menu style={{ marginTop: '10px' }}>
      <Link route="/">
        <a className="item">Houwab</a>
      </Link>
      <Menu.Menu position="right">
        <Link route="/">
          <a className="item">Campaigns</a>
        </Link>
        <Menu.Item>
          <Link route="/campaigns/new">
            <a className="item">
              <i aria-hidden="true" className="add circle large icon" />
            </a>
          </Link>
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
};
