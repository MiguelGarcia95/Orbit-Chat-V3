import React from 'react';
import {Menu, Grid, Header, Container, Icon, Image, Modal, Segment, Label, Input, Button, Dropdown} from 'semantic-ui-react';
import {connect} from 'react-redux';
import UserPanel from './UserPanel';
import MenuHeader from './MenuHeader';

class RoomMenu extends React.Component {
  state = {
    user: this.props.user,
  }
  
  render() {
    // get chatroom, if chatroom null, show homemenu, if chatroom, show chatmenu
    const {user} = this.state;
    return (
      <Menu
        size='large' 
        fixed='left'
        vertical
        className='Chatroom_Header'
      >
        <MenuHeader user={user} />
        <UserPanel user={user} /> 

        {/* Display Chatroom categories + channels */}
        {/* {this.displayCategories(categories)} */}

      </Menu> 
    )
  }
}

export default RoomMenu;