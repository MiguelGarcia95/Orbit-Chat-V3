import React from 'react';
import {Menu} from 'semantic-ui-react';
import {connect} from 'react-redux';

class MenuCategories extends React.Component {
  state = {
  }
  
  render() {
    return (
      <Menu>
      </Menu> 
    )
  }
}

export default connect()(MenuCategories);