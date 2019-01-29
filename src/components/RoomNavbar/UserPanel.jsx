import React from 'react';
import {Grid, Image, Container, Modal, Segment, Button, Label, Input, Dropdown} from 'semantic-ui-react';

class UserPanel extends React.Component {
  state = {
    modal: false,
    user: this.props.user
  }

  openModal = () => this.setState({modal: true});
  closeModal = () => this.setState({modal: false});

  render() {
    const {modal, user} = this.state;
    console.log(user);
    return(
      <Grid className='footer_menu'>
          <Grid.Row columns='2'>
            <Grid.Column verticalAlign='middle' width={12}>
              <Container fluid>
              <Image src={user.photoURL} avatar title={`${user.displayName}'s settings`} />
              {user.displayName}
              </Container>
            </Grid.Column>
            <Grid.Column verticalAlign='middle' width={2}>
              <Container fluid>
                <Dropdown icon='cog'>
                  <Dropdown.Menu direction='left' >
                    <Dropdown.Item text='New Category' onClick={this.openModal} />
                  </Dropdown.Menu>
                </Dropdown>
              </Container>
            </Grid.Column>
          </Grid.Row>
        </Grid>
    )
  }
}

export default UserPanel;