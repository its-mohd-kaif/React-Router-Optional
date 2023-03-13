import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { dataContext } from "../App";
// Contact Component
function Contact() {
  // UseContext
  const user = useContext(dataContext);
  // useLocation hooks for helping into get data that send with routing state
  const location = useLocation();
  const { from } = location.state;
  let navigate = useNavigate();

  // Delete Handler Function
  const deleteHandler = (id) => {
    for (let i = 0; i < user.data.length; i++) {
      if (user.data[i].id === id) {
        user.data.splice(i, 1);
        user.clone.splice(i, 1);
      }
    }
    user.setData([...user.data]);
    user.setClone([...user.clone]);
    navigate("/delete");
  };
  return (
    <div className="contact">
      {from !== "" ? (
        <div className="d-flex">
          <div>
            <img
              style={{ width: "250px", height: "250px", borderRadius: "50%" }}
              src={from.avatar_url}
              alt="avatar"
            />
          </div>
          <div className="ms-5">
            <h3>{from.login}</h3>
            <div>
              <span>Profile Link: </span>
              <a target={"_blank"} href={from.html_url} rel="noreferrer">
                {from.html_url}
              </a>
            </div>
            <div className="d-flex mt-5">
              <Link
                // Pass Data To AddEdit Component
                state={{ from: from }}
                to={"/addEdit"}
                type="button"
                className="btn btn-warning me-1"
              >
                Edit
              </Link>
              <button
                onClick={() => deleteHandler(from.id)}
                type="button"
                className="btn btn-danger"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ) : (
        <h1>Contact Delete Successfully..."</h1>
      )}
    </div>
  );
}

export default Contact;
