import React from 'react';
import {Menu} from 'semantic-ui-react';
import UserPanel from './UserPanel';
import MenuHeader from './MenuHeader';

class RoomMenu extends React.Component {
  state = {
    user: this.props.user,
    currentChatroom: this.props.currentChatroom
  }

  displayMenuHeader = (inChatroom, currentChatroom, user) => {
    if (inChatroom && currentChatroom) {
      return <MenuHeader user={user} chatroom={currentChatroom} />
    } else {
      return null
    }
  }

  displayMenuContent = (value) => {
    if (value) {
      console.log('chatmenu menu')
    } else {
      console.log('home menu')
    }
  }
  
  render() {
    const {user} = this.state;
    const {inChatroom, currentChatroom} = this.props;
    return (
      <Menu
        size='large' 
        fixed='left'
        vertical
        className='Chatroom_Header'
      >
        {/* If it passes, we are in a chatroom and display */}
        {this.displayMenuHeader(inChatroom, currentChatroom, user)}

        <UserPanel user={user} /> 

        {/* Display Chatroom categories + channels */}
        {/* {this.displayFriends(categories)} */}

        {/* {this.displayCategories(categories)} */}
        {/* for categories set active category for parent of active channel. Active category can't collapse */}

      </Menu> 
    )
  }
}

export default RoomMenu;