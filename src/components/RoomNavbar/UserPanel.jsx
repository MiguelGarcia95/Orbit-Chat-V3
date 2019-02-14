import React from 'react';
import {Grid, Image, Container, Modal, Segment, Button, Label, Input, Icon} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {signOut} from '../../actions/authActions';

class UserPanel extends React.Component {
  state = {
    modal: false,
    user: this.props.user
  }

  onChange = e => this.setState({[e.target.name]: e.target.value})

  openModal = () => this.setState({modal: true});

  closeModal = () => this.setState({modal: false});

  onLogout = () => {
    this.props.signOut();
  }

  onSubmit = () => {

  }

  render() {
    const {modal, user} = this.state;
    return(
      <React.Fragment>
        <Grid className='footer_menu'>
          <Grid.Row columns='2'>
            <Grid.Column verticalAlign='middle' width={12}>
              <Container fluid>
              <Image src={user.photoURL} avatar title={`${user.displayName}'s settings`} />
              {user.displayName}
              </Container>
            </Grid.Column>
            <Grid.Column verticalAlign='middle' width={2} style={{position: 'absolute', right: '0px', marginRight: '15px'}}>
              <Container fluid>
                <Dropdown icon='cog' className='grid-icon'>
                  <Dropdown.Menu direction='left' >
                    <Dropdown.Item content='Logout' icon='power off' onClick={this.onLogout} />
                    <Dropdown.Item content='Settingsogout' icon='cog' onClick={this.openModal} />
                  </Dropdown.Menu>
                </Dropdown>
              </Container>
            </Grid.Column>
          </Grid.Row>
        </Grid>

        <Modal open={modal} onClose={this.closeModal} >
          <Modal.Header>Create A New Chatroom</Modal.Header>
          <Modal.Content>
            <Segment>
              <Label attached='top' color='black' >Name</Label>
              <Input fluid placeholder='Chatroom Name' name='name' onChange={this.onChange} />
            </Segment>
            <Segment>
              <Label attached='top' color='black' >Description</Label>
              <Input fluid placeholder='Chatroom Description' name='description' onChange={this.onChange} />
            </Segment>
            <Button.Group attached='bottom'>
              <Button negative onClick={this.closeModal} > Cancel</Button>
              <Button.Or />
              <Button positive onClick={this.onSubmit} > Create</Button>
            </Button.Group>
          </Modal.Content>
        </Modal>
      </React.Fragment>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signOut: () => dispatch(signOut())
  }
}

export default connect(null, mapDispatchToProps)(UserPanel);