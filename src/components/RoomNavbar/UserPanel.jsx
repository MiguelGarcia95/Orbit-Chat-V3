import React from 'react';
import {Grid, Image, Container, Modal, Segment, Button, Label, Input, Icon} from 'semantic-ui-react';

class UserPanel extends React.Component {
  state = {
    modal: false,
    user: this.props.user
  }

  onChange = e => this.setState({[e.target.name]: e.target.value})

  openModal = () => this.setState({modal: true});

  closeModal = () => this.setState({modal: false});

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
            <Grid.Column verticalAlign='middle' width={2}>
              <Container fluid>
                <Icon name='cog' className='grid-icon' onClick={this.openModal} />
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

export default UserPanel;