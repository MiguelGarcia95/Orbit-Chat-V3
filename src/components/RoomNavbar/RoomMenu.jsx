import React from 'react';
import {Menu} from 'semantic-ui-react';
import UserPanel from './UserPanel';
import MenuHeader from './MenuHeader';
import MenuCategories from './MenuCategories';
import MenuHome from './MenuHome';

class RoomMenu extends React.Component {
  state = {
    user: this.props.user,
    currentChatroom: this.props.currentChatroom
  }

  displayMenuHeader = (inChatroom, currentChatroom, user) => {
    if (inChatroom && currentChatroom) {
      return <MenuHeader user={user} chatroom={currentChatroom} />
    }
  }

  displayMenuContent = (inChatroom, currentChatroom, user) => {
    if (inChatroom && currentChatroom) {
      return <MenuCategories user={user} chatroom={currentChatroom}  />
    } else {
      return <MenuHome user={user} chatroom={currentChatroom} />
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

        {/* for categories set active category for parent of active channel. Active category can't collapse */}
        {/* Display Chatroom categories + channels */}
        {this.displayMenuContent(inChatroom, currentChatroom, user)}

        <UserPanel user={user} /> 
      </Menu> 
    )
  }
}

export default RoomMenu;