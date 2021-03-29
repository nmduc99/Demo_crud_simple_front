import { useEffect, useState } from "react";
import Axios from 'axios'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import { Table } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
function CourseList() {
    const deleteCourse = async (id) => {
        try {
            await Axios.delete(`http://localhost:8080/courses/${id}`);
            await getAll();
        } catch (error) {
            console.log(error);
        }
    }


    async function getAll() {
        setState({ loading: true, data: [] });
        const response = await Axios.get(`http://localhost:8080/courses`);
        setState({ loading: false, data: response.data || [] });
    }


    async function handleOnSubmit(e) {
        e.preventDefault();
        const data = {
            code,
            name,
            descrition
        }
        console.log(data)
        setModal(false);
        await Axios.post('http://localhost:8080/courses', data);
        getAll();
    }
    function handleOnAdd(){
        setModal(true);
    }
    function handleCancel(){
        setModal(false);
    }
    
    const [code, setCode] = useState();
    const [name, setName] = useState();
    const [descrition, setDescrition] = useState();
    const [modal, setModal] = useState(false);


    const [state, setState] = useState({ loading: true, data: [] });
    const { loading, data } = state || {};
    console.log('render', state);
    useEffect(() => {
        getAll();
    }, [])


    return (
        <div>
            <h1>Course list</h1>
            <p> </p>
            <Button color="primary" onClick={handleOnAdd}>Add</Button>
            <p> </p>
            {!loading && (
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
                            data && data.map((item, courseIndex) => (
                                <tr key={courseIndex}>
                                    <td>{item.id}</td>
                                    <td>{item.code}</td>
                                    <td>{item.name}</td>
                                    <td>{item.descrition}</td>
                                    <td><Button color="info">Edit</Button>{' '}
                                        <Button onClick={() => {
                                            deleteCourse(item.id);
                                        }}
                                            color="danger">Delete</Button>
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
                                    <label for="code">Code:</label><br />
                                    <input type="text" id="code" name="code"
                                        value={code} onChange={e => setCode(e.target.value)} /> <br />
                                </div>
                                <div>
                                    <label for="name">Name:</label> <br />
                                    <input type="text" id="name" name="name"
                                        value={name} onChange={e => setName(e.target.value)} /> <br />
                                </div>
                              
                                <div>
                                    <label for="descrition">Descrition:</label> <br />
                                    <input type="text" id="descrition" name="descrition"
                                        value={descrition} onChange={e =>  setDescrition(e.target.value)} /> <br />
                                </div>
                               

                            </form>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" type="submit" form="formSubmit" >Save</Button>{' '}
                        <Button color="secondary" onClick={handleCancel}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        </div>

    )
}

export default CourseList;