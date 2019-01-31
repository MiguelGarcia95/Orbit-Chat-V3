import React from 'react';
import {connect} from 'react-redux';
import {getChatroomCategories} from '../../actions/chatroomActions';
import ChannelCategory from '../Layout/ChannelCategory';

class MenuCategories extends React.Component {
  state = {
  }

  componentDidMount() {
    this.props.getChatroomCategories(this.props.chatroom.id);
  }

  displayCategories = (categories) => {
    return categories.map(category => {
      return (
        <ChannelCategory  
          key={category.id}
          channels={this.state.channels}
          category={category} 
          user={this.state.user} 
          chatroom={this.state.chatroom}
          getChannel={this.props.getChannel}
          getChannelComments={this.props.getChannelComments}
        />
      )
    })
  }
  
  render() {
    const {categories} = this.props;
    return (
      <React.Fragment>
        {this.displayCategories(categories)}
      </React.Fragment>
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