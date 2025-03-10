import React, { useState, useEffect } from "react";
import "./tabel.css"
import "./createtodo.css"
import { toast } from 'react-toastify';
import { useNavigate, useLocation } from "react-router-dom";
import { loginTodoRoute, updateTodoRoute } from "../../api/todo";


function CreateTodo({ getUser, getTodo, selectTodoItem }) {
    const location = useLocation();
    const todoData = location.state?.todo;
    const [contact, setcontact] = useState("")
    const [title, settitle] = useState("")
    const [discription, setdiscription] = useState("")
    const [email, setemail] = useState("")
    const [todoId, setTodoId] = useState(null);
    const [userErr, setuserErr] = useState("")
    const [addTodo, setaddTodo] = useState(false)
    const [isEditing, setIsEditing] = useState(false);
    const [isUpdated, setIsUpdated] = useState(false);
    // const [RefreshData, setRefreshData] = useState(false);
    const navigate = useNavigate()


    useEffect(() => {
        if (todoData) {
            console.log("Received Todohhhhhhhhhhhhhhhhhhhhhhhh:", todoData);

            setemail(todoData.email || "");
            setcontact(todoData.contat || "");
            settitle(todoData.title || "");
            setdiscription(todoData.discription || "");
            setTodoId(todoData.id);
            setIsEditing(true);
        }
        if (selectTodoItem) {
            setemail(selectTodoItem.email || "");
            setcontact(selectTodoItem.contat || "");
            settitle(selectTodoItem.title || "");
            setdiscription(selectTodoItem.discription || "");
            setIsEditing(true);
        }
     

    }, [todoData,selectTodoItem, getUser]);

    let addData = async (e) => {
        e.preventDefault()
        const email = e.target.email.value;
        const contact = e.target.contat.value;
        const title = e.target.title.value;
        const discription = e.target.discription.value;

        if (!email || !contact || !title || !discription) {
            setuserErr(true)
        }
        if (isEditing) {
            updateData()
        }
        else {
            todoaddData()
        }

    }

    async function updateData() {
        console.log(email, contact, title, discription, "in editing ")
        // if (selectTodoItem) {
        //     setemail(selectTodoItem.email || "");
        //     setcontact(selectTodoItem.contat || "");
        //     settitle(selectTodoItem.title || "");
        //     setdiscription(selectTodoItem.discription || "");
        //     setIsEditing(true);
        // }
        // setuserErr(false)
        await updateTodoRoute({ email, contact, title, discription })
            .then(response => {

                console.log(response, "todo update");
                toast.success(response.data.message, {
                    autoClose: 500
                })
              
                // getUser()
                clearData()
            })
            .catch(error => {
                console.log(error?.message, "dff", error?.stack, "err", error)

                if (error.status === 404 || error.status === 500 || error.status === 403) {
                    toast.error(error.response.data.message)
                }
            })
    }
    async function todoaddData() {
        await loginTodoRoute({ email, contact, title, discription })
            .then(response => {
                // console.log(email,"signup");
                console.log(response, "todo add");
                toast.success(response.data.message, {
                    autoClose: 500
                })
                getUser()
                clearData()

            })
            .catch(error => {
                if (error.status === 403 || error.status === 500) {
                    // console.log(error.response.data.message, "----------------");
                    toast.error(error.response.data.message)
                }
                console.log(error)
            })
    }


    const clearData = () => {
        setemail("")
        setcontact("")
        settitle("")
        setdiscription("")
        setaddTodo(false)
    }

    return (

        <>
            <form action="" onSubmit={addData} className="data">
                <div className="fields">
                    <input type="email"
                        name="email"
                        placeholder=" email"
                        value={email}
                        onChange={(e) => {
                            setemail(e.target.value)
                            setaddTodo(true)

                        }}
                        required
                    />
                    <input type="text"
                        name="contat"
                        placeholder="mobile no"
                        value={contact}
                        maxLength={10}
                        minLength={10}
                        onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, "");
                            setcontact(value);
                            setaddTodo(true)
                        }}
                        required
                    />
                    <input type="text"
                        name="title"
                        placeholder="title"
                        value={title}
                        onChange={(e) => {
                            settitle(e.target.value)
                            setaddTodo(true)
                        }}
                        required
                    />

                    <input type="text"
                        name="discription"
                        placeholder="discription"
                        value={discription}
                        onChange={(e) => {
                            setdiscription(e.target.value)
                            setaddTodo(true)
                        }}
                        required
                    />
                </div>

                {/* <div className="errors">
                    <p className="err">
                        {userErr ? <span className="alertMess">email is require</span> : ""}
                    </p>
                    <p className="err">
                        {userErr ? <span className="alertMess">contact is require</span> : ""}
                    </p>
                    <p className="err">
                        {userErr ? <span className="alertMess">title is require</span> : ""}
                    </p>
                    <p className="err">

                        {userErr ? <span className="alertMess">discription is require</span> : ""}
                    </p>
                </div> */}

               {
                addTodo ?
                <div className="buttons">
                    <button type="submit" className="butn add">{isEditing ? "update" : "add" }</button>
                    <button onClick={clearData} className="butn add">clear</button>
                </div>
                :""

               }







            </form>
        </>
    )
}
export default CreateTodo