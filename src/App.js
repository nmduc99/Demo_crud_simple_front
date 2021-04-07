import './App.css';
import StudentList from './components/student/StudentList';
import CourseList from './components/course/CourseList';
import React, { useState } from "react";

import { HomeOutlined, SolutionOutlined, BarsOutlined } from '@ant-design/icons';
import {
  // BrowserRouter as Router,
  //Switch,
  Route,
  // Link,
  useHistory
} from "react-router-dom";
import { Col } from 'reactstrap';
import NormalLoginForm from './components/authentication/NormalLoginForm'
import { Alert, Menu  } from 'antd';

const { SubMenu } = Menu;
const Index = () => <h1>Home</h1>;
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
            <Alert  //"Logged in successfully" 
             message={
              "Logged in successfully"
             }
             type="success"  closable />
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

  function handleClick(e) {
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
        </Nav>*/}

      <Menu
        style={{ width: 256 }}   
        mode="vertical"
        onClick={handleClick}        
      >

        <SubMenu key="sub1" icon={<HomeOutlined />} title="Home">
          <Menu.Item key="/home">Home</Menu.Item>
        </SubMenu>

        <SubMenu key="sub2" icon={<SolutionOutlined />} title="Student">
          <Menu.Item key="/students">Student List</Menu.Item>
        </SubMenu>

        <SubMenu key="sub3" icon={<BarsOutlined />} title="Course">
          <Menu.Item key="/courses">Course List</Menu.Item>
        </SubMenu>
      </Menu>

      {renderComponent(authen)}
    </div>
  );

}
export default App;