import React, { useEffect, useState } from "react";
import CreateTodo from "./CreateTodo";
import Tabel from "./Tabel";
import { toast } from 'react-toastify';
import "./todo.css"
import { useNavigate } from "react-router-dom";
import { getTodoRoute, deleteTodoRoute } from "../../api/todo";
// import { getUser } from "../../../../../BACKEND/node-express--api/src/api/controller/user";

function Todo() {
    const navigate = useNavigate()
    const [data, setData] = useState([]);
    const [selectTodoItem, setselectTodoItem] = useState("")
    
    
        useEffect(() => {
            getUserTodo()
            // data
    
        }, [])

    const getUserTodo = async () => {
        try {
            const response = await getTodoRoute()
            console.log(response, "data...");
            if (Array.isArray(response.data.todo)) {
                setData(response.data.todo);
                console.log(response.data.todo,"iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii")
            } else {
                setData([]);
            }
        }
        catch (err) {
            console.log(err, "error.....");
        }
    }

    const editData = (todo) => {
        setselectTodoItem(todo)
        // getUserTodo()
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

    
    console.log(data, "datatatatatatatataattatatatattataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

    return (
        <>
            <div>
                <div className="head">
                    <h3 >Create Your Todo</h3>
                    <button type="submit" className="butn add" onClick={() => {
                        navigate("/todo/newAdd")
                    }}>ADD+</button>
                </div>
            </div>

            <CreateTodo
                getTodo={data}
                getUser={getUserTodo}
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