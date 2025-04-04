import { FaUserAlt } from "react-icons/fa";
import { FaPlusCircle } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import "./profile.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getUserRoute,
  updateUserRoute,
  deleteUserRoute,
} from "../../api/user/index.js";


function Profile() {
  const [changeData, setchangeData] = useState(true);
  const [closeUser, setcloseUser] = useState(true);
  const [userName, setuserName] = useState("");
  const [userEmail, setuserEmail] = useState("");
  const [addProfile, setaddProfile] = useState(null);
  
  const navigate = useNavigate();
  useEffect(() => {
      const profilePath = localStorage.getItem("userProfile");
      console.log(profilePath,"ddddddddddddddddddddddddd")
      if (profilePath) {
          const fullPath = `http://localhost:3000/${profilePath}`;
          console.log(fullPath,"aaaaaaaaaaaaaaaaaaaaaaaaaaaa")
          setaddProfile(fullPath); 
        }
        getuser();
  },[]);

  function changeName(event) {
    setuserName(event.target.value);
  }
  function changeEmail(event) {
    setuserEmail(event.target.value);
  }

  function handleImageChange(event) {
    const file = event.target.files[0];
    if (file) {
      setaddProfile(file);
    }
  }
  async function getuser() {
    try {
      const data = await getUserRoute();
      console.log(data, "-------------");
      setuserName(data.data.user.name);
      setuserEmail(data.data.user.email);

        localStorage.setItem("userName",  data.data.user.name);
        localStorage.setItem("userEmail", data.data.user.email);
        localStorage.setItem("userProfile", data.data.user.profile);
    } catch (err) {
      console.log(err, "----");
    }
  }


  async function updateUserData() {
    const name = userName;
    const email = userEmail;

    let bodyFormData = new FormData();
    bodyFormData.append("name", name);
    bodyFormData.append("email", email);

    if (addProfile instanceof File) {
      bodyFormData.append("profileimage", addProfile);
    }
    console.log(addProfile, "ggggggggggggggggggggggggggggggg");
    try{

   const response= await updateUserRoute(bodyFormData)
    //   .then((response) => {
        console.log(response, "user data updata");
        toast.success(response.data.message, {
          autoClose: 1000,
        });
        if (response.data.updateUser.profile) {
              const fullPath = `http://localhost:3000/${response.data.updateUser.profile}`;
            // localStorage.setItem("userProfile", response.data.updateUser.profile)
        //   localStorage.getItem("userProfile");
        // setaddProfile(response.data.updateUser.profile,);
          setaddProfile(fullPath);
          localStorage.getItem("userProfile")
        }
    //   })

   
    }
      catch(error)  {
        if (error.status === 403) {
          toast.error(error.response.data.message);
        }
        console.log(error);
      };
  }

  async function userCloseAccount() {
    // e.preventDefault()
    const email = userEmail;
    await deleteUserRoute({ email })
      .then((response) => {
        // console.log(response, "user data delete");
        localStorage.clear();
        toast.success(response.data.message, {
          autoClose: 500,
        });
        navigate("/");
      })
      .catch((error) => {
        if (error.status === 404) {
          toast.error(error.response.data.message);
        }
        console.log(error);
      });
  }

  function submitData(e) {
    e.preventDefault();
  }
  async function changetext() {
    updateUserData();
    setchangeData(!changeData);
  }
  function deleteUser() {
    userCloseAccount();
    setcloseUser(!closeUser);
  }

  return (
    <>
      <h1 className="info">Details</h1>

      <form onSubmit={submitData}>

        <div className="d">

          <div id="file">
            {addProfile ? (
              <img
                src={
                  typeof addProfile === "string"
                    ? addProfile
                    : URL.createObjectURL(addProfile)
                }
                alt="Profile"
                className="profile-image"
              />
            ) : (
              <label>
                <FaUserAlt className="icon" />
              </label>
            )}
            <label htmlFor="fileAdd">
              <FaPlusCircle className="Plus" />
            </label>

            <input
              type="file"
              name="profileimage"
              id="fileAdd"
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
          </div>
          
          <input
            type="text"
            name="name"
            id="name"
            value={userName}
            onChange={changeName}
          />
          <input
            type="email"
            name="email"
            id="email"
            value={userEmail}
            onChange={changeEmail}
          />
          {
            <button type="sumbit" onClick={changetext} className="changeData">
              update
            </button>
          }

          {
            <button type="submit" onClick={deleteUser} className="changeData">
              delete account
            </button>
          }
        </div>
      </form>
    </>
  );
}
export default Profile;
