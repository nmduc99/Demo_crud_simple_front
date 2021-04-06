import './App.css';
import StudentList from './components/student/StudentList';
import CourseList from './components/course/CourseList';
import React, { useState } from "react";

import { MailOutlined } from '@ant-design/icons';
import {
  BrowserRouter as Router,
  //Switch,
  Route,
  Link,
  useHistory
} from "react-router-dom";
import { Nav, NavItem, Col } from 'reactstrap';
import NormalLoginForm from './components/authentication/NormalLoginForm'
import { Alert, Menu } from 'antd';

const { SubMenu } = Menu;
const Index = () => <h2>Home</h2>;
function App() {

  const [authen, setAuthen] = useState(false);
  let history = useHistory();

  function Login(username, password) {
    console.log(username)
    if (username === 'admin') {
      setAuthen(true)
    }
  }

  const renderComponent = (authen) => {
    if (authen) {
      return (
        <React.Fragment>
          <Col sm="3">
            <Alert message="Logged in successfully" type="success" closable showIcon />
          </Col>
          <Route path="/home" exact component={Index} />
          <Route path="/students/" exact component={StudentList} />
          <Route path="/courses/" exact component={CourseList} />
        </React.Fragment>
      )
    } else {
      return (
        <Route path="/" exact render={() => {
          return !authen && <NormalLoginForm login={Login} />
        }} />
      );
    }
  }

  function handleClick(e){
    console.log('click ', e.key);
    history.push(e.key);
  }
  return (
      <div className="App">
        {/* <Nav>
          <NavItem>
            <Link to="/home"><h4>Home </h4></Link>
          </NavItem>
          <NavItem>
            <Link to="/students"><h4>Student </h4></Link>
          </NavItem>
          <NavItem>
            <Link to="/courses"><h4>Course</h4></Link>
          </NavItem>
        </Nav>         */}
        
        <Menu
          style={{ width: 256 }}
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          onClick={handleClick}
        >
          <SubMenu key="sub1" icon={<MailOutlined />} title="Home">
          <Menu.Item key="/home">Home</Menu.Item>          
          </SubMenu>

          <SubMenu key="sub2" icon={<MailOutlined />} title="Student">
            <Menu.Item key="/students">Student List</Menu.Item>
          </SubMenu>

          <SubMenu key="sub3" icon={<MailOutlined />} title="Course">
            <Menu.Item key="/courses">Course List</Menu.Item>
          </SubMenu>
        </Menu>
        
        {renderComponent(authen)}
      </div>
  );

}
export default App;