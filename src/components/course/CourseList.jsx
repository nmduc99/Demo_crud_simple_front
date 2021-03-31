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
            code : course.code,
            name: course.name,
            descrition : course.descrition
        }
        if(course.id){
            const{id} = course;
            data.id = id
            await Axios.put(`http://localhost:8080/courses/${id}`, data);

        }else
        {
            await Axios.post('http://localhost:8080/courses', data);

        }
        setModal(false);
        getAll();

        setCourse({
            id: '',
            code: '',
            name: '',
            descrition:'',
        })
    }
    function handleOnAdd(){
        setModal(true);
    }
    function handleCancel(){
        setCourse({
            id: '',
            code: '',
            name: '',
            descrition:'',
        })
        setModal(false);
    }
    
function editCourse(id)
{
    Axios.get(`http://localhost:8080/courses/${id}`)
    .then(response => response.data)
    .then(data => setCourse({
        id: data.id,
        code: data.code,
        name: data.name,
        descrition: data.descrition
       
    }))
setModal(true)
}

    const [modal, setModal] = useState(false);

    const [course, setCourse] = useState({
        id: '',
        code: '',
        name : '',
        descrition :''
    }) 

    const [state, setState] = useState({ loading: true, data: [] });
    const { loading, data } = state || {};
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
                                    <td><Button color="info" onClick={() => editCourse(item.id)} 
                                            >Edit</Button>{' '}
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
                    <ModalHeader >Course</ModalHeader>
                    <ModalBody>
                        <div>
                            <form id="formSubmit" onSubmit={handleOnSubmit} >
                            <div>
                                    <label for="code">Code:</label><br />
                                    <input type="text" id="code" name="code"
                                        value={course.code} onChange={e => setCourse({...course, code: e.target.value})} /> <br />
                                </div>
                                <div>
                                    <label for="name">Name:</label> <br />
                                    <input type="text" id="name" name="name"
                                        value={course.name} onChange={e => setCourse({...course, name: e.target.value})} /> <br />
                                </div>
                              
                                <div>
                                    <label for="descrition">Descrition:</label> <br />
                                    <input type="text" id="descrition" name="descrition"
                                        value={course.descrition} onChange={e =>  setCourse({...course, descrition: e.target.value})} /> <br />
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