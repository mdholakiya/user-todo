import React, { useEffect, useState } from "react";
import CreateTodo from "./CreateTodo";
import Tabel from "./Tabel";
import { toast } from 'react-toastify';
import "./todo.css"
import { useNavigate } from "react-router-dom";
import { getTodoRoute, updateTodoRoute, loginTodoRoute, deleteTodoRoute } from "../../api/todo";
// import { getTodoRoute } from "../../api/todo/index.js";
// import { useEffect } from "react";

function Todo() {
    const navigate = useNavigate()
    const [data, setData] = useState([]);
    const [selectTodoItem, setselectTodoItem] = useState("")


    const getUserTodo = async () => {
        try {
            const response = await getTodoRoute()
            console.log(response, "data...");
            setData(response.data.todo)
        }
        catch (err) {
            console.log(err, "error.....");
        }
    }

    const editData = (todo) => {
        setselectTodoItem(todo)
    }

    async function deleteData(id) {
        try {
            const data = await deleteTodoRoute(id)
            console.log(data, "deleted data");
            getUserTodo()
            toast.success(data.data.message, {
                autoClose: 500
            })
        }
        catch (err) {
            console.log(err, "error.....");
        }

    }

    useEffect(() => {
        // alert("refresh main")
        getUserTodo()
        console.log("qqqqqqqqqqqqqqqqqqqqqqq")
    }, [])

    return (
        <>
            <div>
                <div className="head">
                    <h3 >Create Your Todo</h3>
                    <button type="submit" className="butn add" onClick={() => {
                        navigate("/toDo/newAdd")
                    }}>ADD+</button>
                </div>
            </div>
            <CreateTodo
                getTodo={data}
                selectTodoItem={selectTodoItem}
            />

            <Tabel
                getTodo={data}
                editTodo={editData}
                deleteTodo={deleteData}
            />

        </>
    )
}
export default Todo