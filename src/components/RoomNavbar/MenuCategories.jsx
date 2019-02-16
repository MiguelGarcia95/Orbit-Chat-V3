import React from 'react';
import {connect} from 'react-redux';
import {getChatroomCategories} from '../../actions/chatroomActions';
import {getChannels} from '../../actions/channelActions';
import ChannelCategory from '../Layout/ChannelCategory';

class MenuCategories extends React.Component {
  componentDidMount() {
    this.props.getChatroomCategories(this.props.chatroom.id);
    this.props.getChannels(this.props.chatroom.id);
  }

  getChatroomCategoriesRT = (chatroomId) => {

  }

  getChannelsRT = (chatroomId) => {

  }
  

  displayCategories = (categories) => {
    return categories.map(category => {
      return (
        <ChannelCategory  
          key={category.id}
          category={category} 
          user={this.props.user} 
          chatroom={this.props.chatroom}
          channels={this.props.channels}
        />
      )
    })
  }
  
  render() {
    const {categories} = this.props;
    return (
      <React.Fragment>
        <div className='category_container'  >
        {this.displayCategories(categories)}
        </div>
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