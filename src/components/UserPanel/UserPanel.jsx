import React from 'react';
import {Grid, Image, Container, Modal, Segment, Button, Label, Input} from 'semantic-ui-react';

class UserPanel extends React.Component {
  state = {
    modal: false
  }

  openModal = () => this.setState({modal: true});
  closeModal = () => this.setState({modal: false});

  render() {
    const {modal} = this.state;
    return(
      <React.Fragment>
        <Grid className='sidebar_user' >
          <Container fluid>
            <Image title={'Username Settings'} src='/img/ChatLogo.png' rounded centered onClick={this.openModal} />
          </Container>
        </Grid>
      {/* Modal for Settings Modal */}
      <Modal size='small' basic centered={false} open={modal} >
        <Modal.Header>Settings</Modal.Header>
        <Modal.Content>
          <Segment>
            <Label attached='top' >Name</Label>
            <Input fluid placeholder='Category Name' name='name' />
          </Segment>
          <Button.Group attached='bottom'>
            <Button negative onClick={this.closeModal} >Cancel</Button>
            <Button.Or />
            <Button positive >Save</Button>
          </Button.Group>
        </Modal.Content>
      </Modal>
      </React.Fragment>
    )
  }
}

export default UserPanel;