import React from 'react';
import {Link} from 'react-router-dom';
import { Grid, Form, Segment, Button, Header, Message, Image} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {signIn} from '../../actions/authActions';
import firebase from '../../firebase';

class SignIn extends React.Component {
  state = {
    email: '',
    password: ''
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.props.history.push('/app');
      }
    })
  }

  handleSubmit = () => {
    if (isFormValid()) {
      this.props.signIn(this.state);
    }
  }

  isFormValid = () => {
    if (this.state.email && this.state.password) {
      return true;
    } else {
      return false;
    }
  }

  onChange = e => this.setState({[e.target.name]: e.target.value});

  render() {
    const isSubmitDisabled = !this.isFormValid();

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
              <Button color='violet' fluid size='large' onClick={this.handleSubmit} disabled={isSubmitDisabled}>Submit</Button>
            </Segment>
          </Form>
          <Message>Not a user? <Link to='/signup'>Sign Up</Link></Message> 
        </Grid.Column>
      </Grid>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signIn: credentials => dispatch(signIn(credentials))
  }
}
  
export default connect(null, mapDispatchToProps)(SignIn);