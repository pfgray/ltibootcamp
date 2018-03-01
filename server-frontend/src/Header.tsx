import * as React from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';

const logo = require('./logo.png');

export default () => (
  <Nav>
    <NavItem>
      <img src={logo} />
    </NavItem>
    <NavItem>
      <NavLink href="/">Home</NavLink>
    </NavItem>
    <NavItem>
      <NavLink href="/tools">Tools</NavLink>
    </NavItem>
  </Nav>
)
