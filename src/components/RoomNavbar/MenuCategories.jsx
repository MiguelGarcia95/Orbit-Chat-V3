import React from 'react';
import {Menu} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {getChatroomCategories} from '../../actions/chatroomActions';

class MenuCategories extends React.Component {
  state = {
  }
  
  render() {
    return (
      <Menu>
        <p>Categories here</p>
      </Menu> 
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getChatroomCategories: chatroomId => dispatch(getChatroomCategories(chatroomId)) 
  }
}

export default connect(null, mapDispatchToProps)(MenuCategories);