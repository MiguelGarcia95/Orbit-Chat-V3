import React from 'react';
import {Grid, Image, Container} from 'semantic-ui-react';

const UserPanel = () => {
  return(
    <React.Fragment>
      <Grid className='sidebar_user' >
      <Container fluid>
        <Image src='/img/ChatLogo.png' rounded centered />
      </Container>
    </Grid>
    {/* Modal for Settings Modal */}
        {/* <Modal size='small' basic centered={false} >
          <Modal.Header>Settings</Modal.Header>
          <Modal.Content>
            <Segment>
              <Label attached='top' >Name</Label>
              <Input fluid placeholder='Category Name' name='name' />
            </Segment>
            <Button.Group attached='bottom'>
              <Button negative >Cancel</Button>
              <Button.Or />
              <Button positive >Save</Button>
            </Button.Group>
          </Modal.Content>
        </Modal> */}
    </React.Fragment>
    
  )
}

export default UserPanel;