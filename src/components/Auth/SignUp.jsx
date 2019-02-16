import React from 'react';
import {Link} from 'react-router-dom';
import { Grid, Form, Segment, Button, Header, Message, Image} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {signUp} from '../../actions/authActions'
import firebase from '../../firebase';

class SignUp extends React.Component {
  state = {
    username: '',
    email: '',
    password: '',
    confirmed_password: ''
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        //if logged in, set up the user
        this.props.history.push('/app');
      }
    })
  }

  handleSubmit = () => {
    this.props.signUp(this.state);
  }

  onChange = e => this.setState({[e.target.name]: e.target.value});

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
                  onChange={this.onChange}
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
                  onChange={this.onChange}
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
                  onChange={this.onChange}
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
                  onChange={this.onChange}
                />
              </Form.Field>
              <Button color='violet' fluid size='large' onClick={this.handleSubmit}>Submit</Button>
            </Segment>
          </Form>
          <Message>Already a user? <Link to='/signin'>Sign In</Link></Message> 
        </Grid.Column>
      </Grid>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signUp: credentials => dispatch(signUp(credentials))
  }
}

export default connect(null, mapDispatchToProps)(SignUp);