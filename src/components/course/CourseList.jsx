import { useEffect, useState } from "react";
import axios from 'axios'

import { Button } from 'reactstrap';
import { Table } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
function CourseList() {
    const [courses, setCourse] = useState([]);

    useEffect(() => {
        async function getAll() {
            const response = await axios.get(`http://localhost:8080/courses`)
                .then(res => res.data)
            setCourse(response);
        }
        getAll()
    }, [])

    return (
        <div>
            <h1>Course list</h1>
            <Button color="primary">Add</Button>
            <p> </p>
            <Table bordered>
                <thead>
                    <tr>
                        <td><b>Id</b></td>
                        <td><b>Code</b></td>
                        <td><b>Name</b></td>
                        <td><b>Descrition</b></td>
                        <td></td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    {
                        courses && courses.map(courses => (
                            <tr>
                                <td>{courses.id}</td>
                                <td>{courses.code}</td>
                                <td>{courses.name}</td>
                                <td>{courses.descrition}</td>
                                <td><Button color="info">Edit</Button>{' '}
                                    <Button color="danger">Delete</Button>
                                </td>

                            </tr>
                        ))
                    }
                </tbody>

            </Table>
        </div>

    )
}

export default CourseList;