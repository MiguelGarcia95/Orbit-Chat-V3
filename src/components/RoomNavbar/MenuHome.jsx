import React from 'react';
import {Menu} from 'semantic-ui-react';
import {connect} from 'react-redux';

class MenuHome extends React.Component {
  state = {
  }
  
  render() {
    return (
      <Menu>
        <p>Home settings & nakama</p>
      </Menu> 
    )
  }
}

export default connect()(MenuHome);