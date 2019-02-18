import React from 'react';
import {Grid, Container, Modal, Segment, Button, Label, Input, Dropdown} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {createCategory, leaveChatroom} from '../../actions/chatroomActions';

class MenuHeader extends React.Component {
  state = {
    modal: false,
    user: this.props.user,
    chatroom: this.props.chatroom,
    name: ''
  }

  openModal = () => this.setState({modal: true});
  closeModal = () => this.setState({modal: false});

  onChange = e => this.setState({[e.target.name]: e.target.value});

  onSubmit = () => {
    this.props.createCategory(this.state);
    this.closeModal();
  }

  render() {
    const {modal} = this.state;
    return(
      <React.Fragment>
        <Grid className='header_menu'>
          <Grid.Row columns='2' style={{paddingBottom: 0}}>
            <Grid.Column verticalAlign='middle' width={12}>
              <Container fluid>
              {this.props.chatroom.chatroom.name}
              </Container>
            </Grid.Column>
            <Grid.Column verticalAlign='middle' width={2} style={{position: 'absolute', right: '0px', marginRight: '10px'}}>
              <Container fluid>
                <Dropdown icon='caret down'>
                  <Dropdown.Menu direction='left' >
                    <Dropdown.Item content='New Category' onClick={this.openModal} icon='list' />
                    <Dropdown.Item content='Leave Chatroom' onClick={this.openModal} icon='minus circle' />
                  </Dropdown.Menu>
                </Dropdown>
              </Container>
            </Grid.Column>
          </Grid.Row>
        </Grid>

        {/* Modal for New Category */}
        <Modal open={modal} onClose={this.closeModal} >
          <Modal.Header>Create A New Category</Modal.Header>
          <Modal.Content>
            <Segment>
              <Label attached='top' color='black' >Name</Label>
              <Input fluid placeholder='Category Name' name='name' onChange={this.onChange} />
            </Segment>
            <Button.Group attached='bottom'>
              <Button negative onClick={this.closeModal} >Cancel</Button>
              <Button.Or />
              <Button positive onClick={this.onSubmit} >Create</Button>
            </Button.Group>
          </Modal.Content>
        </Modal>
      </React.Fragment>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createCategory: category => dispatch(createCategory(category)),
    leaveChatroom: (user, chatroom) => dispatch(leaveChatroom(user, chatroom))
  }
}

export default connect(null, mapDispatchToProps)(MenuHeader);
