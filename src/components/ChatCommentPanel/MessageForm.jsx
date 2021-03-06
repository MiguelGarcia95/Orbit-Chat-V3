import React from 'react';
import {Segment, Input, Button} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {createChannelComment} from '../../actions/channelActions';

class MessageForm extends React.Component {
  state = {
    comment: '',
    user: this.props.user
  }

  onChange = e => this.setState({[e.target.name]: e.target.value});

  onFormKeyDown = e => {
    if (e.keyCode === 13 && e.target.value) {
      this.onSubmit();
    }
  }
  
  onSubmit = () => {
    if (this.state.comment) {
      this.props.createChannelComment({...this.state, channel: this.props.channel});
      this.clearForm();
    }
  }

  isFormEmpty = () => this.state.comment ? false : true;

  clearForm = () => this.setState({comment: ''});

  render() {
    const {comment} = this.state;
    const isMessageEmpty = this.isFormEmpty()
    return (
      <Segment className='message_form'>
        <Input
          fluid
          name='comment'
          onChange={this.onChange}
          onKeyDown={this.onFormKeyDown}
          style={{marginBottom: '0.7em'}}
          labelPosition='left'
          value={comment}
          placeholder='Write your message'
        />
        <Button.Group icon >
          <Button
            onClick={this.onSubmit}
            color='blue'
            content='Add Comment'
            labelPosition='left'
            icon='comment'
            disabled={isMessageEmpty}
          />
        </Button.Group>
      </Segment>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createChannelComment: comment => dispatch(createChannelComment(comment))
  }
}

export default connect(null, mapDispatchToProps)(MessageForm);