import React from 'react';
import {connect} from 'react-redux';
import {getFirestore} from 'redux-firestore';

import {setCategories} from '../../actions/chatroomActions';
import {setChannels} from '../../actions/channelActions';
import ChannelCategory from '../Layout/ChannelCategory';


class MenuCategories extends React.Component {
  componentDidMount() {
    this.getChatroomCategoriesRT(this.props.chatroom.id);
    this.getChannelsRT(this.props.chatroom.id);
  }

  getChatroomCategoriesRT = chatroomId => {
    const firestore = getFirestore();
    firestore.collection(`categories/${chatroomId}/categories`).onSnapshot(snapshot => {
      let changes = snapshot.docChanges();
      this.props.setCategories(changes);
    })
  }

  getChannelsRT = chatroomId => {
    const firestore = getFirestore();
    firestore.collection(`channels/${chatroomId}/channels`).onSnapshot(snapshot => {
      let changes = snapshot.docChanges();
      this.props.setChannels(changes);
    })
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
    setCategories: docCategories => dispatch(setCategories(docCategories)),
    setChannels: docChannels => dispatch(setChannels(docChannels))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuCategories);