import React from 'react';
import {Menu} from 'semantic-ui-react';
// import {connect} from 'react-redux';
import UserPanel from './UserPanel';
import MenuHeader from './MenuHeader';

class RoomMenu extends React.Component {
  state = {
    user: this.props.user,
    currentChatroom: this.props.currentChatroom
  }
  
  render() {
    // get chatroom, if chatroom null, show homemenu, if chatroom, show chatmenu
    const {user, currentChatroom} = this.state;
    console.log(this.props.currentChatroom)
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