import React from 'react';
import {Grid, Image, Container} from 'semantic-ui-react';

const UserPanel = () => {
  return(
    <Grid className='sidebar_user' >
      <Container fluid>
        <Image src='/img/ChatLogo.png' rounded centered />
      </Container>
    </Grid>
  )
}

export default UserPanel;