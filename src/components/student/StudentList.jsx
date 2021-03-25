import { useEffect, useState } from "react";
import axios from 'axios'


function StudentList(){
    const [students, setStudent] = useState([]);

    useEffect(()=>{
        async function getAll(){
        const response  = await axios.get(`http://localhost:8080/students`)
            .then(res =>  res.data)
            setStudent(response);
        }
        getAll()
    },[])

    return (
        <div>
            <h1>Student list</h1>
            <table>
               <thead>
                <tr>
                        <td><b>Id</b></td>
                        <td><b>Name</b></td>
                        <td><b>CodeStudent</b></td>
                        <td><b>Address</b></td>
                        <td><b>Email</b></td>
                        <td></td>
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
                                <td><button>Edit</button></td>
                           </tr>
                       ))
                   }
               </tbody>
                
            </table>
        </div>
    )
}

export default StudentList;