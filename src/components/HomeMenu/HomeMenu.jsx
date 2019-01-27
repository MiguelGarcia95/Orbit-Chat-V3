import React from 'react';
// import {Menu, Grid, Container, Icon, Image, Modal, Segment, Label, Input, Button} from 'semantic-ui-react';
import {Menu, Modal, Segment, Label, Input, Button} from 'semantic-ui-react';

class HomeMenu extends React.Component {
  state = {
    settingsModal: false,
  }

  // UNSAFE_componentWillReceiveProps(nextProps) {
  //   this.setState({user: nextProps.user});
  // }

  onChange = e => this.setState({[e.target.name]: e.target.value});

  openSettingsModal = () => this.setState({settingsModal: true});
  closeSettingsModal = () => this.setState({settingsModal: false});

  onSettingsSubmit = () => {
  }

  render() {
    const  {settingsModal} = this.state;
    return (
      <Menu
      size='large' 
      fixed='left'
      vertical
      >        
        <Modal size='small' basic centered={false} open={settingsModal} onClose={this.closeSettingsModal} >
          <Modal.Header>Settings</Modal.Header>
          <Modal.Content>
            <Segment>
              <Label attached='top' >Name</Label>
              <Input fluid placeholder='Category Name' name='name' onChange={this.onChange} />
            </Segment>
            <Button.Group attached='bottom'>
              <Button negative onClick={this.closeSettingsModal}>Cancel</Button>
              <Button.Or />
              <Button positive onClick={this.onSettingsSubmit}>Save</Button>
            </Button.Group>
          </Modal.Content>
        </Modal>

      </Menu>
    )
  }
}

export default HomeMenu;