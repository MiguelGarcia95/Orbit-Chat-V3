import React from 'react';
import {Grid, Header, Container, Icon, Modal, Segment, Label, Input, Button} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {createChannel} from '../../actions/channelActions';

class ChannelCategory extends React.Component {
  state = {
    modal: false,
    name: '',
    description: '',
    user: this.props.user,
    chatroom: this.props.chatroom,
    category: this.props.category
  }

  onSubmit = () => {
    this.props.createChannel(this.state)
  }

  onChange = e => this.setState({[e.target.name]: e.target.value});

  openModal = () => this.setState({modal: true});

  closeModal = () => this.setState({modal: false});

  displayChannels = (channels, category) => {
  }

  render() {
    const {modal} = this.state;
    return (
      <React.Fragment>
        <Grid className='category_container' >
          <Container fluid textAlign='right'>
            <Header as='h4' className='category_header' floated='left' >{this.props.category.category.name}</Header>
            <Icon name='plus' style={{cursor: 'pointer'}}  onClick={this.openModal} />
          </Container>
          <Container fluid textAlign='right'>
            {/* {this.displayChannels(channels, category)} */}
          </Container>
        </Grid>

        <Modal open={modal} onClose={this.closeModal} >
          <Modal.Header>Create A New Channel</Modal.Header>
          <Modal.Content>
            <Segment>
              <Label attached='top' color='black' >Name</Label>
              <Input fluid placeholder='Channel Name' name='name' onChange={this.onChange} />
            </Segment>
            <Segment>
              <Label attached='top' color='black' >Description</Label>
              <Input fluid placeholder='Channel Name' name='description' onChange={this.onChange} />
            </Segment>
            <Button.Group attached='bottom'>
              <Button negative onClick={this.closeModal}>Cancel</Button>
              <Button.Or />
              <Button positive onClick={this.onSubmit}>Create</Button>
            </Button.Group>
          </Modal.Content>
        </Modal>

      </React.Fragment>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createChannel: channel => dispatch(createChannel(channel))
  }
}

export default connect(null, mapDispatchToProps)(ChannelCategory);