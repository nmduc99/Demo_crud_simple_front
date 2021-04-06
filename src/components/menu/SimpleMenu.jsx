import { Menu } from 'antd';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;

class Sider extends React.Component {
  handleClick = e => {
    console.log('click ', e);
  };

  render() {
      
    return (
      <Menu
       onClick={this.handleClick}
        style={{ width: 256 }}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
      >
        <SubMenu key="sub1" icon={<MailOutlined />} title="Home">
         <Menu.Item key="1">Home</Menu.Item>
        </SubMenu>

        <SubMenu key="sub2" icon={<MailOutlined />} title="Student">
         <Menu.Item key="">Student List</Menu.Item>
        </SubMenu>

        <SubMenu key="sub3" icon={<MailOutlined />} title="Course">
         <Menu.Item key="">Course List</Menu.Item>
        </SubMenu>
        
        
      </Menu>
    );
  }
}
