import React from 'react';
import {Link} from 'react-router-dom';
import { Grid, Form, Segment, Button, Header, Message, Image} from 'semantic-ui-react';
// import {connect} from 'react-redux';
import firebase from '../../firebase';

class SignUp extends React.Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.props.history.push('/app');
      }
    })
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
                  icon='user'
                  iconPosition='left'
                  name='username' 
                  type='username'
                  placeholder='Username'
                />
              </Form.Field>
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
              <Form.Field>
                <Form.Input 
                  fluid
                  icon='lock'
                  iconPosition='left'
                  name='confirmed_password' 
                  type='password'
                  placeholder='Confirm Password'
                />
              </Form.Field>
              <Button color='violet' fluid size='large'>Submit</Button>
            </Segment>
          </Form>
          <Message>Already a user? <Link to='/signin'>Sign In</Link></Message> 
        </Grid.Column>
      </Grid>
    )
  }
}

export default SignUp;