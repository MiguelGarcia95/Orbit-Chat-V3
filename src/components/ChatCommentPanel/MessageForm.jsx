import React from 'react';
import {Segment, Input, Button} from 'semantic-ui-react';

class MessageForm extends React.Component {
  state = {

  }

  onChange = e => this.setState({[e.target.name]: e.target.value});
  
  onSubmit = () => {
    console.log(this.state);
  }

  render() {
    return (
      <Segment className='message_form'>
        <Input
          fluid
          name='message'
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

export default MessageForm;