import React, { Component } from 'react'
import { Button, Header, Icon, Image, Menu, Segment, Sidebar } from 'semantic-ui-react'

export class SidebarSidebar extends Component {
  constructor(props) {
    super(props);
    this.state={
      visible: false
    }

    this.handleTabClick = this.handleTabClick.bind(this);
  }



  handleTabClick = () => {
    if(this.state.visible){
      this.setState({ visible: false });
    } else {
      this.setState({ visible: true });
    }
  }
  handleSidebarHide = () => this.setState({ visible: false });

  render() {
    const { visible } = this.state

    return (
      <div>
        <Button.Group>
          <Button onClick={this.handleTabClick}>
            <i className="fas fa-bars"></i>
          </Button>
        </Button.Group>

        <Sidebar.Pushable as={Segment}>
          <Sidebar
            as={Menu}
            animation='overlay'
            icon='labeled'
            inverted
            onHide={this.handleSidebarHide}
            vertical
            visible={visible}
            width='thin'
          >
            <Menu.Item as='a'>
              <Icon name='home' />
              Home
            </Menu.Item>
            <Menu.Item as='b'>
              <Icon name='gamepad' />
              Games
            </Menu.Item>
            <Menu.Item as='a'>
              <Icon name='camera' />
              Channels
            </Menu.Item>
          </Sidebar>

          <Sidebar.Pusher>
            
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    )
  }
}
