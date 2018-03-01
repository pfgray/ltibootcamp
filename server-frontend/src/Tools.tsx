import * as React from 'react';
import withFetch from './withFetch';
import { ListGroup, ListGroupItem, Button, Input, InputGroup, InputGroupAddon, Container, Row, Col } from 'reactstrap';
import { compose, withState } from 'recompose';

import { VpnKey } from 'material-ui-icons';

function createTool(toolName, setCreating, setToolName, refetch){
  setCreating(true);
  fetch('/api/newtool?name=' + toolName).then(() => {
    setCreating(false);
    setToolName(null);
    refetch();
  });
}

function toggleCreds(tool, credsOpen, setCredsOpen) {
  if(isOpen(tool, credsOpen)) {
    setCredsOpen(credsOpen.filter(id => id !== tool.client_id))
  } else {
    setCredsOpen(credsOpen.concat([tool.client_id]))
  }
}

function isOpen(tool, credsOpen) {
  return credsOpen.find(id => id === tool.client_id);
}

export default compose(
  withFetch('/api/tools'),
  withState('creating', 'setCreating', false),
  withState('toolName', 'setToolName', null),
  withState('credsOpen', 'setCredsOpen', [])
)((props: any) => (
  <Container className="mt-4">
    <Row>
      <Col>
        <InputGroup>
          <Input value={props.toolName} onChange={e => props.setToolName(e.target.value)} />
          <InputGroupAddon addonType="append">
            <Button color="primary" onClick={() => createTool(props.toolName, props.setCreating, props.setToolName, props.refetch)}>Add Tool</Button>
          </InputGroupAddon>
        </InputGroup>
        <ListGroup className='mt-4'>
          {props.data.tools.map(tool => (
              <ListGroupItem>
                <div className="d-flex align-items-center">
                  {tool.name}
                  {tool.client_id}
                  <div className='creds'>
                    <VpnKey onClick={() => toggleCreds(tool, props.credsOpen, props.setCredsOpen)} />
                  </div>
                </div>
                {isOpen(tool, props.credsOpen) ? (
                  <div className='mt-2'><pre>{JSON.stringify(tool, null, 2)}</pre></div>
                ) : null}
              </ListGroupItem>
          ))}
        </ListGroup>
      </Col>
    </Row>
  </Container>
));
