import './App.css';
import StudentList from './components/student/StudentList';
import CourseList from './components/course/CourseList';
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  //Switch,
  Route,
  Link
} from "react-router-dom";
import { Nav, NavItem } from 'reactstrap';
import NormalLoginForm from './components/authentication/NormalLoginForm'


const Index = () => <h2>Home</h2>;
function App() {
  const [authen, setAuthen] = useState(false);
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
  return (
    <Router>
      <div className="App">
        <Nav vertical>
          <NavItem>
            <Link to="/home">Home</Link>
          </NavItem>
          <NavItem>
            <Link to="/students">Student</Link>
          </NavItem>
          <NavItem>
            <Link to="/courses">Course</Link>
          </NavItem>
        </Nav>
        {renderComponent(authen)}
      </div>
    </Router>
  );
}

export default App;