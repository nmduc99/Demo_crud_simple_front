import './App.css';
import StudentList from './components/student/StudentList';
import CourseList from './components/course/CourseList';
import React, { useState } from "react";

import {
  // BrowserRouter as Router,
  Switch,
  Route,
  // Link,
  useHistory,
  Redirect
} from "react-router-dom";
import NormalLoginForm from './components/authentication/NormalLoginForm'
import { Menu } from 'antd';

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
          <Menu
            style={{ width: 256 }}
            mode="inline"
            onClick={handleClick}
          >
            <Menu.Item key="/students">Student List</Menu.Item>
            <Menu.Item key="/courses">Course List</Menu.Item>

          </Menu>

          <Switch>
            <Route path="/students/" exact component={StudentList} />
            <Route path="/courses/" exact component={CourseList} />
          </Switch>
          
        </React.Fragment>
      )
    } else {
      return (
        <Switch>
          <Route path="/login"
            exact render={() => {
              return !authen && <NormalLoginForm login={Login} />
            }}
          />
          <Redirect to="/login" exact />  

        </Switch>

      );
    }
  }

  function handleClick(e) {
    console.log('click ', e.key);
    history.push(e.key);
  }

  return (
    <> <div>
      {renderComponent(authen)}
    </div>
    </>

  )

}
export default App;