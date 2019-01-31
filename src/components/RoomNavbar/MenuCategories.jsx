import React from 'react';
import {connect} from 'react-redux';
import {getChatroomCategories} from '../../actions/chatroomActions';
import {getChannels} from '../../actions/channelActions';
import ChannelCategory from '../Layout/ChannelCategory';

class MenuCategories extends React.Component {
  state = {
  }

  componentDidMount() {
    this.props.getChatroomCategories(this.props.chatroom.id);
    this.props.getChannels(this.props.chatroom.id);
  }

  displayCategories = (categories) => {
    return categories.map(category => {
      return (
        <ChannelCategory  
          key={category.id}
          category={category} 
          user={this.props.user} 
          chatroom={this.props.chatroom}
        />
      )
    })
  }
  
  render() {
    const {categories, channels} = this.props;
    return (
      <React.Fragment>
        {this.displayCategories(categories)}
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    categories: state.chat.categories,
    channels: state.channel.channels
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getChatroomCategories: chatroomId => dispatch(getChatroomCategories(chatroomId)),
    getChannels: (chatroomId) => dispatch(getChannels(chatroomId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuCategories);