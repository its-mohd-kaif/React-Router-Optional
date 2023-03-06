import React, { useContext, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { dataContext } from "../App";

function AddEdit() {
  // useLocation hooks for helping into get data that send with routing state
  const location = useLocation();
  const { from } = location.state;
  // UseConext State
  const user = useContext(dataContext);
  // Ref For Input Fields
  let loginRef = useRef();
  let urlRef = useRef();
  let navigate = useNavigate();
  //   UseState For File Image Field
  const [image, setImage] = useState("");
  // Message State For Showing alerts
  const [message, setMessage] = useState("");

  // OnChange Image Handler
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  };
  // Validation Function
  const validation = () => {
    if (loginRef.current.value === "") {
      setMessage("Login id field can not be empty!!");
      loginRef.current.focus();
      return false;
    } else if (urlRef.current.value === "") {
      setMessage("HTML URL field can not be empty!!");
      urlRef.current.focus();
      return false;
    } else if (image === "") {
      setMessage("Choose Image !!");
      return false;
    } else return true;
  };
  // Add Handler Function
  const addHandler = () => {
    if (validation()) {
      let obj = {
        id: Math.floor(Math.random() * 1000),
        login: loginRef.current.value,
        html_url: urlRef.current.value,
        avatar_url: image,
      };
      user.setData([...user.data, obj]);
      user.setClone([...user.clone, obj]);
      alert("Contact Added Successfully");
      navigate("/");
    }
  };
  // Edit Handler
  const editHandler = (id) => {
    if (validation()) {
      let obj = {
        id: from.id,
        login: loginRef.current.value,
        html_url: urlRef.current.value,
        avatar_url: image,
      };
      for (let i = 0; i < user.data.length; i++) {
        if (user.data[i].id === id) {
          user.data.splice(i, 1, obj);
          user.clone.splice(i, 1, obj);
        }
      }
      user.setData([...user.data]);
      user.setClone([...user.clone]);
      alert("Contact Edit Successfully");
      navigate("/");
    }
  };

  return (
    <div className="contact">
      {from !== "" ? <h1>Edit Page</h1> : <h1>Add Page</h1>}

      <div className="input-group mb-3">
        <input
          ref={loginRef}
          type="text"
          className="form-control"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          defaultValue={from.login}
        />
        <span className="input-group-text" id="basic-addon2">
          Login Id
        </span>
      </div>
      <div className="input-group mb-3">
        <input
          ref={urlRef}
          type="text"
          className="form-control"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          defaultValue={from.html_url}
        />
        <span className="input-group-text" id="basic-addon2">
          HTML URL
        </span>
      </div>
      <div className="input-group mb-3">
        <input onChange={onImageChange} type={"file"} />
      </div>
      <div class="d-grid gap-2">
        {from !== "" ? (
          <button
            onClick={() => editHandler(from.id)}
            className="btn btn-success"
            type="button"
          >
            EDIT
          </button>
        ) : (
          <button onClick={addHandler} class="btn btn-success" type="button">
            ADD
          </button>
        )}
      </div>
      <br></br>
      {message !== "" ? (
        <div
          className="alert alert-warning alert-dismissible fade show"
          role="alert"
        >
          {message}
          <button
            type="button"
            class="btn-close"
            onClick={() => setMessage("")}
          ></button>
        </div>
      ) : null}
    </div>
  );
}

export default AddEdit;
