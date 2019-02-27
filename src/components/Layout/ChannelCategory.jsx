import React from 'react';
import {Grid, Header, Container, Icon, Modal, Segment, Label, Input, Button} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {createChannel, setChannel} from '../../actions/channelActions';

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
    this.closeModal();
    this.props.createChannel(this.state);
  }

  onChange = e => this.setState({[e.target.name]: e.target.value});

  openModal = () => this.setState({modal: true});
  closeModal = () => this.setState({modal: false});

  sortChannels = (channels, category) => {
    return channels.reduce(function (filteredChannels, channel) {
      if (channel.channel.categoryId === category.id) {
        filteredChannels.push(channel)
      }
      return filteredChannels
    }, [])
  }

  onChannelClick = channel => {
    this.props.setChannel(channel)
  }

  isActiveChannel = (channel) => {
    return channel.id === this.props.currentChannel.id  ? 'active' : ''
  }

  displayChannels = (channels, category) => {
    let matchingChannels = this.sortChannels(channels, category);
    return matchingChannels.map(channel => {
      return (
        <Header 
          as='h5' 
          textAlign='left'  
          key={channel.id}
          onClick={this.onChannelClick.bind(null, channel)}
          className={`category_channel ${this.isActiveChannel(channel)}`} 
        >
          {channel.channel.name}
        </Header>
      )
    })
  }

  render() {
    const {modal, category, chatroom, user} = this.state;
    const {channels, currentChannel} = this.props;
    return (
      <React.Fragment>
        <Grid >
          <Container fluid textAlign='right'  >
            <Header as='h4' className='category_header' floated='left' >{this.props.category.category.name}</Header>
            {chatroom.chatroom.uid === user.uid && (
              <Icon name='plus' style={{cursor: 'pointer'}}  onClick={this.openModal} />
            )}
          </Container>
          <Container fluid textAlign='right'>
            {currentChannel && this.displayChannels(channels, category)}
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

const mapStateToProps = state => {
  return {
    currentChannel: state.channel.currentChannel
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createChannel: channel => dispatch(createChannel(channel)),
    setChannel: channel => dispatch(setChannel(channel))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChannelCategory);