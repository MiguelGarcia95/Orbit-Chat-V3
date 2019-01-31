import React from 'react';
import {Menu} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {getChatroomCategories} from '../../actions/chatroomActions';

class MenuCategories extends React.Component {
  state = {
  }

  componentDidMount() {
    this.props.getChatroomCategories(this.props.chatroom.id);
  }
  
  render() {
    console.log(this.props.categories)
    return (
      <Menu>
        <p>Categories here</p>
      </Menu> 
    )
  }
}

const mapStateToProps = state => {
  return {
    categories: state.chat.categories
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getChatroomCategories: chatroomId => dispatch(getChatroomCategories(chatroomId)) 
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuCategories);