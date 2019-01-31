import React from 'react';
import {Grid, Header, Container, Icon, Modal, Segment, Label, Input, Button} from 'semantic-ui-react';
import {connect} from 'react-redux';

class ChannelCategory extends React.Component {
  state = {
    modal: false,
    name: '',
    description: ''
  }

  onSubmit = () => {
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
        <Grid  >
          <Container fluid textAlign='right' className='category__container'>
            <Header as='h2' className='category__header' floated='left' >{this.props.category.category.name}</Header>
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


export default connect()(ChannelCategory);