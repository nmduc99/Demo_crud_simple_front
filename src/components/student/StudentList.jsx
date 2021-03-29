import { useEffect, useState } from "react";
import React from "react"
import Axios from 'axios'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Table } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";

function StudentList() {

    const deleteStudent = async (id) => {
        try {
            await Axios.delete(`http://localhost:8080/students/${id}`);
            await getAll();
        } catch (error) {
            console.log(error);
        }
    }



    async function getAll() {
        setState({ loading: true, data: [] });
        const response = await Axios.get(`http://localhost:8080/students`);
        setState({ loading: false, data: response.data || [] });
    }

    const [state, setState] = useState({ loading: true, data: [] });
    const { loading, data } = state || {};

    useEffect(() => {
        getAll();
    }, [])

     async function handleOnSubmit(e) {
        e.preventDefault();
        const data = {
            name,
            codeStudent : code,
            address,
            email
        }
        console.log(data)
        setModal(false);
        console.log("log")
        await axios.post('http://localhost:8080/students', data);
        await getAll();
         
    }
    function handleOnAdd(){
        setModal(true);
    }
    function handleCancel(){
        setModal(false);
    }


    const [name, setName] = useState();
    const [code, setCodeStudent] = useState();
    const [address, setAddress] = useState();
    const [email, setEmail] = useState();

    const [modal, setModal] = useState(false);

    return (
        <div>
            <h1>Student list</h1>
            <p> </p>
            <Button color="primary" onClick={handleOnAdd} >Add</Button>
            <p> </p>
            {!loading && (
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
                            data && data.map((item, courseIndex) => (
                                <tr key={courseIndex}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.codeStudent}</td>
                                    <td>{item.address}</td>
                                    <td>{item.email}</td>
                                    <td>
                                        <Button color="info" >Edit</Button>
                                        <Button onClick={() => {

                                            deleteStudent(item.id);
                                        }} color="danger">Delete
                                    </Button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>

                </Table>
            )}


            <div>

                <Modal isOpen={modal} fade={true}   >
                    <ModalHeader >Add Student</ModalHeader>
                    <ModalBody>
                        <div>
                            <form id="formSubmit" onSubmit={handleOnSubmit} >
                                <div>
                                    <label for="name">Name:</label> <br />
                                    <input type="text" id="name" name="name"
                                        value={name} onChange={e => setName(e.target.value)} /> <br />
                                </div>
                                <div>
                                    <label for="code">CodeStudent:</label><br />
                                    <input type="text" id="code" name="code"
                                        value={code} onChange={e => setCodeStudent(e.target.value)} /> <br />
                                </div>
                                <div>
                                    <label for="address">Address:</label> <br />
                                    <input type="text" id="address" name="address"
                                        value={address} onChange={e => setAddress(e.target.value)} /> <br />
                                </div>
                                <div>
                                    <label for="email">Email:</label> <br />
                                    <input type="text" id="email" name="email" 
                                    value={email}  onChange={e => setEmail(e.target.value)}  /> <br />
                                </div>

                            </form>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" type="submit"  form="formSubmit" >Save</Button>{' '}
                        <Button color="secondary" onClick={handleCancel}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        </div>

    )

}

export default StudentList;