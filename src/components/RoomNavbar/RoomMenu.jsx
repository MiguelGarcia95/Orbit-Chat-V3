import React from 'react';
import {Menu, Grid, Header, Container, Icon, Image, Modal, Segment, Label, Input, Button, Dropdown} from 'semantic-ui-react';
import {connect} from 'react-redux';
import UserPanel from './UserPanel';

class RoomMenu extends React.Component {
  state = {
    user: this.props.user
  }

  render() {
    // get chatroom, if chatroom null, show homemenu, if chatroom, show chatmenu
    const {user} = this.state;
    return (
      <Menu
        size='large' 
        fixed='left'
        vertical
        // style={{paddingTop: '30px'}}
        className='Chatroom_Header'
      >
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

        <UserPanel user={user} /> 

        {/* <HeaderFooter 
          chatroom={chatroom} 
          openModal={this.openCategoryModal}
          name={chatroom && chatroom.chatroom.name}
        /> */}

        {/* Modal for New Category */}
        {/* <Modal >
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
        </Modal> */}

        {/* Display Chatroom categories + channels */}
        {/* {this.displayCategories(categories)} */}


      </Menu> 
    )
  }
}

export default RoomMenu;