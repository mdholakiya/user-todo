import React, { useState,useEffect } from "react";
import "./tabel.css"
import "./createtodo.css"
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { loginTodoRoute,updateTodoRoute } from "../../api/todo";
// import Tabel from "./Tabel";


function CreateTodo({selectTodoItem}){
    
    const [contact, setcontact] = useState("")
    const [title, settitle] = useState("")
    const [discription, setdiscription] = useState("")
    const [email, setemail] = useState("")
    
    const [userErr, setuserErr] = useState("")
    const [addTodo, setaddTodo] = useState(false)
    const [isEditing, setIsEditing] = useState(false);
    
    const navigate = useNavigate()
    
    async function addData(e) {
        e.preventDefault()
        if (!email || !contact || !title || !discription) {
            setuserErr(true)
        }
        try{
            if(isEditing){
                const email = e.target.email.value;
                const contact = e.target.contat.value;
                const title = e.target.title.value;
                const discription = e.target.discription.value;

                await updateTodoRoute(selectTodoItem.id,{ email, contact, title, discription })
                toast.success(response.data.message, {
                    autoClose: 500
                })
            }

        
        else {
            setuserErr(false)
            const email = e.target.email.value;
            const contact = e.target.contat.value;
            const title = e.target.title.value;
            const discription = e.target.discription.value;
            
            await loginTodoRoute({ email, contact, title, discription })
            // console.log("gfdgjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj")
                .then(response => {
                    // console.log(email,"signup");
                    console.log(response, "todo add");
                    toast.success(response.data.message, {
                        autoClose: 500
                    })
                    navigate("/toDo/add")
                })
                .catch(error => {
                    if (error.status === 403) {
                        // console.log(error.response.data.message, "----------------");

                        toast.error(error.response.data.message)
                    }
                    console.log(error)
                })
        }
    }catch(error){
        console.log(error,"ffffffffffffffffffffffffff")
    }
}
    
    useEffect(() => {
        if (selectTodoItem) {
            setemail(selectTodoItem.email || "");
            setcontact(selectTodoItem.contat || "");
            settitle(selectTodoItem.title || "");
            setdiscription(selectTodoItem.discription || "");
            setIsEditing(true);
        }
    }, [selectTodoItem]);

    const clearData = () => {
        setaddTodo(false)
        setemail("")
        setcontact("")
        settitle("")
        setdiscription("")
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
                    />

                    <input type="text"
                        name="title"
                        placeholder="title"
                        value={title}
                        onChange={(e) => {
                            settitle(e.target.value)
                            setaddTodo(true)
                        }}
                    />

                    <input type="text"
                        name="discription"
                        placeholder="discription"
                        value={discription}
                        onChange={(e) => {
                            setdiscription(e.target.value)
                            setaddTodo(true)
                        }}
                    />
                </div>

                <div className="errors">
                    <p className="err">
                        {userErr && <span className="alertMess">email is require</span>}
                    </p>
                    <p className="err">
                        {userErr && <span className="alertMess">contact is require</span>}
                    </p>
                    <p className="err">
                        {userErr && <span className="alertMess">title is require</span>}
                    </p>
                    <p className="err">

                        {userErr && <span className="alertMess">discription is require</span>}
                    </p>
                </div>
                {
                    addTodo ?
                        <div className="buttons">
                            <button type="submit"className="butn add" >{isEditing? "update" :"add"}</button>
                            <button onClick={clearData} className="butn add">clear</button>
                        </div>
                        : ""

                }
            </form>
        </>
    )
}
export default CreateTodo