import React from 'react';
import {Segment, Input, Button} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {createDirectMessage} from '../../actions/homeActions';

class MessageForm extends React.Component {
  state = {
    comment: ''
  }

  onChange = e => this.setState({[e.target.name]: e.target.value});
  
  onSubmit = () => {
    this.props.createDirectMessage(this.props.user, this.props.otherUser, this.state.comment);
    this.clearForm();
  }

  clearForm = () => this.setState({comment: ''});

  render() {
    const {comment} = this.state;
    return (
      <Segment className='message_form'>
        <Input
          fluid
          name='comment'
          onChange={this.onChange}
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
          />
        </Button.Group>
      </Segment>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createDirectMessage: (user, otherUser, comment) => dispatch(createDirectMessage(user, otherUser, comment))
  }
}

export default connect(null, mapDispatchToProps)(MessageForm);