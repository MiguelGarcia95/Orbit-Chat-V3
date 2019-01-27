import React from 'react';
import {Link} from 'react-router-dom';
import { Grid, Form, Segment, Button, Header, Message, Image} from 'semantic-ui-react';
// import {connect} from 'react-redux';
// import firebase from '../../firebase';

class SignIn extends React.Component {
  state = {

  }

  render() {
    return (
      <Grid textAlign='center' verticalAlign='middle' className='app'>
        <Grid.Column width={4}>
          <Header as='h1' color='black' icon textAlign='center'>
            <i className='icon'>
              <Image src='/img/ChatLogoBLK.png' size='tiny' rounded centered />
            </i>
            Login to Orbit
          </Header>
          <Form size='large' >
            <Segment raised >
              <Form.Field>
                <Form.Input 
                fluid
                icon='mail'
                iconPosition='left'
                name='email' 
                type='email'
                placeholder='Email'
                />
              </Form.Field>
              <Form.Field>
                <Form.Input 
                fluid
                icon='lock'
                iconPosition='left'
                name='password' 
                type='password'
                placeholder='Password'
                />
              </Form.Field>
              <Button color='violet' fluid size='large'>Submit</Button>
            </Segment>
          </Form>
          <Message>Not a user? <Link to='/signup'>Sign Up</Link></Message> 
        </Grid.Column>
      </Grid>
    )
  }
}
  
export default SignIn;