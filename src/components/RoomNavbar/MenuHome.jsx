import React from 'react';
import {Menu} from 'semantic-ui-react';
import {connect} from 'react-redux';

class MenuHome extends React.Component {
  state = {
  }
  
  render() {
    return (
      <Menu>
      </Menu> 
    )
  }
}

export default connect()(MenuHome);