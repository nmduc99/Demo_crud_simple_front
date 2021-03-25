import { useEffect, useState } from "react";
import axios from 'axios'


function CourseList(){
    const [courses, setCourse] = useState([]);

    useEffect(()=>{
        async function getAll(){
        const response  = await axios.get(`http://localhost:8080/courses`)
            .then(res =>  res.data)
            setCourse(response);
        }
        getAll()
    },[])

    return (
        <div>
            <h1>Course list</h1>
            <table>
               <thead>
                <tr>
                        <td><b>Id</b></td>
                        <td><b>Code</b></td>
                        <td><b>Name</b></td>
                        <td><b>Descrition</b></td>
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
                               <td><button>Edit</button></td>
                           </tr>
                       ))
                   }
               </tbody>
                
            </table>            
        </div>
        
    )
}

export default CourseList;