import React from 'react';
import {Menu, Grid, Container, Dropdown} from 'semantic-ui-react';

const UserPanel = () => {
  return(
    <Menu.Header 
      as='div'
      className='Menu_User'
      content={
        <Grid>
          <Grid.Row columns='2'>
            <Grid.Column verticalAlign='middle' width={12}>
              <Container fluid>
                {'User Name'}
              </Container>
            </Grid.Column>
            <Grid.Column verticalAlign='middle' width={2}>
              <Container fluid>
                <Dropdown icon='caret up'>
                  <Dropdown.Menu direction='left' >
                    <Dropdown.Item text='New Category' />
                  </Dropdown.Menu>
                </Dropdown>
              </Container>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      }
    />
  )
}

export default UserPanel;