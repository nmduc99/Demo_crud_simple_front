import './App.css';
import StudentList from './components/student/StudentList';
import CourseList from './components/course/CourseList';
import React, { useState } from "react";

import {
  // BrowserRouter as Router,
  //Switch,
  Route,
  // Link,
  useHistory
} from "react-router-dom";
import { Col } from 'reactstrap';
import NormalLoginForm from './components/authentication/NormalLoginForm'
import { Alert, Menu } from 'antd';

function App() {

  const [authen, setAuthen] = useState(localStorage.getItem("authen") === "true");
  let history = useHistory();

  function Login(username, password) {
    if (username === 'admin') {
      setAuthen(true)
      localStorage.setItem("authen", true)
    }
  }

  const renderComponent = (authen) => {

    if (authen) {

      return (
        <React.Fragment>
          <Menu
            style={{ width: 256 }}
            mode="inline"
            onClick={handleClick}
          >
            {menuData.map((menuItem, menuIndex) => {
              const { text, key } = menuItem;
              return (
                <Menu.Item key={key}>{text}</Menu.Item>
              )
            }
            )}

          </Menu>
          <Col sm="3">
            <Alert  //"Logged in successfully" 
              message={
                "Logged in successfully"
              }
              type="success" closable />
       
          </Col>
          <Route path="/students/"  component={StudentList} />
          <Route path="/courses/" exact component={CourseList} />
        </React.Fragment>
      )
    } else {
      return (
        <NormalLoginForm login={Login} />
       
      );
    }
  }

  function handleClick(e) {
    console.log('click ', e.key);
    history.push(e.key);
  }

  const menuData = [
    { key: "/students", text: "Student" },
    { key: "/courses", text: "Courses" }
  ]

  return (
    <div className="App">
      {renderComponent(authen)}
    </div>
  );

}
export default App;