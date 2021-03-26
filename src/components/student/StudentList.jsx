import { useEffect, useState } from "react";
import React from "react"
import Axios from 'axios'
import { Button } from 'reactstrap';
import { Table } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function StudentList() {
    // const [state, setState] = useState([])
    const deleteTask = (id)=> {
        Axios({
            method: "DELETE",
            url: `http://localhost:8080/students/${id}`,
          }).catch((err) => {
            console.log(err);
          });
    }
    const [students, setStudent] = useState([]);
    useEffect(() => {
        // async function getAll() {
        //     const response = await axios.get(`http://localhost:8080/students`)
        //         .then(res => res.data)
        //     setStudent(response);.
                fetch('http://localhost:8080/students')
                .then(response => 
                    response.json())
                .then(data => {
                    setStudent(data)});
        //getAll()
        
    }, [])
    

    return (
        <div>
            <h1>Student list</h1>
            <p> </p>
            <Button  color="primary" >Add</Button>
            <p> </p>
            <Table bordered>
                <thead>
                    <tr>
                        <td><b>Id</b></td>
                        <td><b>Name</b></td>
                        <td><b>CodeStudent</b></td>
                        <td><b>Address</b></td>
                        <td><b>Email</b></td>
                        <td>

                        </td>
                    </tr>
                </thead>
                <tbody>
                    {
                        students && students.map(student => (
                            <tr>
                                <td>{student.id}</td>
                                <td>{student.name}</td>
                                <td>{student.codeStudent}</td>
                                <td>{student.address}</td>
                                <td>{student.email}</td>
                                <td>
                                    <Button color="info">Edit</Button>
                                    <Button  onClick={() => {
                                    deleteTask(student.id);
                                    }} color="danger">Delete
                                    </Button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>

            </Table>
        </div>

    )

}

export default StudentList;