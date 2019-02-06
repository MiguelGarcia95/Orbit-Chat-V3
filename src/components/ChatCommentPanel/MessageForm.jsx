import React from 'react';
import {Segment, Input, Button} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {createChannelComments} from '../../actions/channelActions';

class MessageForm extends React.Component {
  state = {
    comment: '',
    user: this.props.user
  }

  onChange = e => this.setState({[e.target.name]: e.target.value});
  
  onSubmit = () => {
    // console.log({...this.state, channel: this.props.channel})
    this.props.createChannelComments({...this.state, channel: this.props.channel});
  }

  render() {
    return (
      <Segment className='message_form'>
        <Input
          fluid
          name='comment'
          onChange={this.onChange}
          style={{marginBottom: '0.7em'}}
          labelPosition='left'
          placeholder='Write your message'
        />
        <Button.Group icon widths='2'>
          <Button
            onClick={this.onSubmit}
            color='blue'
            content='Add Comment'
            labelPosition='left'
            icon='comment'
          />
          <Button
            color='black'
            // onClick={this.openModal}
            content='Upload Image'
            labelPosition='right'
            icon='picture'
          />
        </Button.Group>
      </Segment>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createChannelComments: comment => dispatch(createChannelComments(comment))
  }
}

export default connect(null, mapDispatchToProps)(MessageForm);