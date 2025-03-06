import React, { useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { LuNotebookPen } from "react-icons/lu";
import "./tabel.css"
import { Link } from "react-router-dom";


function Tabel({getTodo,deleteTodo,editTodo})  {
 
    // const[loading,setloading]=useState(false)
    // const [data, setData] = useState([data])
    // const [editBtn, seteditBtn] = useState(false)
    // const navigate = useNavigate()

    // useEffect(() => {
    //         // alert("refresh main")
    //         getTodo
    //         console.log("qqqqqqqqqqqqqqqqqqqqqqq")
    //     })

    console.log(getTodo, "-----------fggdgg-");
    return (
        <>

            <table className="tododetails" >
                <thead className="thead">
                    <tr>
                        <th>Id</th>
                        <th>Email</th>
                        <th>Contact</th>
                        <th>Title</th>
                        <th>Discription</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody className="tbody">
                    {getTodo?.length>0 && getTodo.map((items) => {
                        return (
                            <tr key={items.id}>
                                <td>{items.id}</td>
                                <td>{items.email}</td>
                                <td>{items.contat}</td>
                                <td>{items.title}</td>
                                <td>{items.discription}</td>
                                <td>

                                    <button className="option"
                                        onClick={() => {
                                            editTodo(items)
                                        }}>
                                        <MdEdit />
                                    </button>

                                    <Link to={"/toDo/newAdd"}>
                                        <button className="option" type="submit"><LuNotebookPen /></button>
                                    </Link>

                                    <button className="option" onClick={()=>
                                        {
                                            deleteTodo(items.id)   
                                        }}><MdDeleteForever /></button>
                                </td>
                            </tr>
                        )
                    
                    }
                    )}
                
                </tbody>
            </table>

        </>
    )
}
export default Tabel