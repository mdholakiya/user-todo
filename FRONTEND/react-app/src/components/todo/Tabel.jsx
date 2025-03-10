import React, { useEffect } from "react";
import { MdDeleteForever } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { LuNotebookPen } from "react-icons/lu";
import "./tabel.css"
import { useNavigate, useLocation } from "react-router-dom";
// import CreateTodo from "./CreateTodo";
// import { useState } from "react";


function Tabel({getTodo, deleteTodo, editTodo }) {
    useEffect(()=>{
      getTodo
    },[])

    const navigate = useNavigate()
    const location = useLocation()
    //  const [selectedTodo, setSelectedTodo] = useState(null);


    console.log(getTodo, "-----------fggdgg----------------------------------------");
    // console.log(items,"ggggggggggggggggggggggggggggggggggggggggggg")
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
                    {getTodo?.length > 0 && getTodo.map((items) => {
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


                                    <button className="option" onClick={() => {
                                        // console.log(items,"ooooooooooooooooooooooooooooooooooo")
                                        // localStorage.setItem( JSON.stringify(items));
                                        navigate("/todo/newAdd", { state: { todo: items } });
                                        editTodo(items)
                                    }}
                                        type="submit"><LuNotebookPen /></button>


                                    <button className="option" onClick={() => {
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