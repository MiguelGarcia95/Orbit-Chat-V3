import React from 'react';
import {connect} from 'react-redux';

import {getReference} from '../../actions/homeActions';
import FriendList from './FriendList';
import FriendListHeader from './FriendListHeader';
import FriendChatHeader from './FriendListHeader';
import Messages from './Messages';
import MessageForm from './MessageForm';
import { dispatch } from 'rxjs/internal/observable/pairs';

class HomeContentPanel extends React.Component {
  state = {
  }

  componentDidMount() {
    if (this.props.currentView !== 'friends') {
      // this.props.getReference(this.props.user.uid, this.props.currentView)
    }
  }



  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.currentView !== nextProps.currentView && nextProps.currentView !== 'friends') {
      this.props.getReference(nextProps.user.uid, nextProps.currentView)
    }
  }

  displayHomeContent = view => {
    if (view === 'friends') {
      console.log('return friend list view')
    } else {
      console.log('return dm chat')
    }
  }

  render() {
    const {currentView} = this.props;
    return (
      <section className='home_content_panel'>
        {currentView && this.displayHomeContent(currentView)}
      </section>
    )
  }
}

const mapDispatchToProps = referenceId => {
  return {
    getReference: (userId, referenceId) => dispatch(getReference(userId, referenceId))
  }
}

export default connect(null, mapDispatchToProps)(HomeContentPanel);