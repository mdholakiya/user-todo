import React, { useEffect, useState } from "react"
import "./profile.css"
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { getUserRoute, updateUserRoute, deleteUserRoute } from "../../api/user/index.js";


// console.log(localStorage.getItem("Token"))
// console.log(localStorage.getItem("Username"))
// console.log(localStorage.getItem("Email"))
function Profile() {
    const [changeData, setchangeData] = useState(true);
    const [closeUser, setcloseUser] = useState(true);
    const [userName, setuserName] = useState("")
    const [userEmail, setuserEmail] = useState("")
    const navigate = useNavigate();

    function changeName(event) {
        setuserName(event.target.value)
    }
    function changeEmail(event) {
        setuserEmail(event.target.value)
    }

    async function getuser() {
        try {

            const data = await getUserRoute()
            console.log(data, "-------------")
            setuserName(data.data.user.name)
            setuserEmail(data.data.user.email)
        }
        catch (err) {
            console.log(err, "----");

        }
    }

    useEffect(() => {
        getuser()
    }, [])

    async function userCloseAccount(e) {
        e.preventDefault()
        const email = userEmail;
        await deleteUserRoute({ email })

            .then(response => {
                console.log(response, "user data delete");
                toast.success(response.data.message, {
                    autoClose: 500
                })
                navigate("/user/login")
            })
            .catch(error => {
                if (error.status === 404) {
                    toast.error(error.response.data.message, {
                        autoClose: 1000
                    })
                }
                console.log(error)

            })
    }

    async function updateUserData(e) {
        e.preventDefault()
        const name = userName;
        const email = userEmail;
        await updateUserRoute({ name, email })

            .then(response => {
                console.log(response, "user data updata");
                toast.success(response.data.message, {
                    autoClose: 1000
                })
            })
            .catch(error => {
                if (error.status === 403) {
                    toast.error(error.response.data.message, {
                        autoClose: 1000
                    })
                }
                console.log(error)

            })
    }

    function submitData(e){
        e.preventDefault()
       
    }

    async function changetext() {
        updateUserData() 
        // e.preventDefault()
        setchangeData(!changeData)
    }
    function deleteUser() {
        userCloseAccount()
        // e.preventDefault()
        setcloseUser(!closeUser)
      
    }

    return (
        <>
         
            <h1 className="info">Details</h1>
            <form onSubmit={submitData}>
                <div className="details">

                    <input type="text"
                        name="name"
                        id="name"
                        value={userName}
                        onChange={changeName}
                    />
                    <input type="email"
                        name="email"
                        id="email"
                        value={userEmail}
                        onChange={changeEmail}
                    />
                    {
                         <button type="sumbit" onSubmit={changetext} className="changeData">update</button> 
                    }

                    {
                      <button type="submit" onSubmit={deleteUser} className="changeData">delete account</button> 
                    }
                </div>
            </form>
        </>
    )
}
export default Profile