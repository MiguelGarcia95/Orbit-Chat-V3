import React from 'react';
import {Grid, Menu, Container, Modal, Segment, Button, Label, Input, Dropdown} from 'semantic-ui-react';

class MenuHeader extends React.Component {
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
      <React.Fragment>
        <Menu.Header 
          as='div' 
          content={
            <Grid>
              <Grid.Row columns='2'>
                <Grid.Column verticalAlign='middle' width={12}>
                  <Container style={{width: '100%', overflow: 'hidden'}} >
                    {'Chatroom Name'}
                  </Container>
                </Grid.Column>
                <Grid.Column verticalAlign='middle' width={2}>
                  <Container fluid>
                    <Dropdown icon='plus'>
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
        {/* Modal for New Category */}
        <Modal >
          <Modal.Header>Create A New Category</Modal.Header>
          <Modal.Content>
            <Segment>
              <Label attached='top' color='black' >Name</Label>
              <Input fluid placeholder='Category Name' name='categoryName' />
            </Segment>
            <Button.Group attached='bottom'>
              <Button negative >Cancel</Button>
              <Button.Or />
              <Button positive >Create</Button>
            </Button.Group>
          </Modal.Content>
        </Modal>
      </React.Fragment>
    )
  }
}

export default MenuHeader;
