
import './App.css';
import StudentList from './components/student/StudentList';
import CourseList from './components/course/CourseList';
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import { Nav, NavItem, NavLink } from 'reactstrap';
const Index = () => <h2>Home</h2>;
function App() {
  return (
    <Router>
      <div className="App">
        {/* <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/students">Student</Link>
            </li>
            <li>
              <Link to="/courses">Course</Link>
            </li>
          </ul>
        </nav>     */}
        {/* 
        <nav class="nav">
          <a class="home" href="/">Home </a>
          <a class="nav-link" href="/students">Student </a>
          <a class="nav-link" href="/courses">Course </a>
        </nav> */}


        <Nav>
          <NavItem>
            <NavLink href="/">Home</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/students">Student</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/courses">Course</NavLink>
          </NavItem>      
        </Nav>


        <Route path="/" exact component={Index} />
        <Route path="/students/" exact component={StudentList} />
        <Route path="/courses/" exact component={CourseList} />
      </div>
    </Router>
  );
}

export default App;