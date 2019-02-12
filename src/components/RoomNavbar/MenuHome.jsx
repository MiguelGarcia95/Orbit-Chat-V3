import React from 'react';
import {Grid, Container, Header, Icon, Image} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {setHomeView} from '../../actions/homeActions';

class MenuHome extends React.Component {
  isOptionActive = name => {
    return name === this.props.currentView ? 'active' : '';
  }

  isDMOnDisplay = () => {
    return this.props.currentView !== 'friends' ? 'active' : '';
  }

  // Get real time comments

  onClick = view => {
    console.log('clicked')
    this.props.setHomeView(view)
  }

  displayReferences = (references) => {
    if (references.length > 0) {
      console.log(references)
      return references.map(reference => {
        return (
          <Grid.Row 
            onClick={() => this.onClick(reference.uid)}  
            className={`home_option_reference ${this.isOptionActive(reference.uid)}`} 
            key={reference.uid} verticalAlign="middle" textAlign='center'
          >
            <Container fluid textAlign='right' >
              <Header as='h3' style={{margin: '0', lineHeight: '35px'}} floated='left' >{reference.username}</Header>
              <Image circular src={reference.avatar} size='mini' floated='right' verticalAlign="middle" />
            </Container>
          </Grid.Row>
        )
      })
    }
  }

  render() {
    const {references} = this.props;
    return (
      <React.Fragment>
        <Grid className='home_optiopns_container' style={{marginTop: '0'}}>
          <Grid.Row
            onClick={() => this.onClick('friends')} 
            className={`home_option ${this.isOptionActive('friends')}`} 
            verticalAlign="middle" textAlign='center' 
          >
            <Container fluid textAlign='right'>
              <Header as='h3' style={{margin: '0'}} floated='left'>Friends</Header>
              <Icon name='users'  size='large'/>
            </Container>
          </Grid.Row>
        </Grid>

        <Grid className='home_optiopns_container home_DM' style={{marginTop: '0'}}>
          <Grid.Row className={`home_option ${this.isDMOnDisplay()}`} verticalAlign="middle" textAlign='center' >
            <Container fluid textAlign='right' >
              <Header as='h3' style={{margin: '0'}} floated='left'>Direct Messages</Header>
              <Icon name='mail'  size='large'/>
            </Container>
          </Grid.Row>
          <section className='home_options_ref_container'>
            {references &&  this.displayReferences(references)}
          </section>
        </Grid>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    references: state.home.references,
    currentView: state.home.currentView,
    directMessages: state.home.directMessages
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setHomeView: view => dispatch(setHomeView(view))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuHome);