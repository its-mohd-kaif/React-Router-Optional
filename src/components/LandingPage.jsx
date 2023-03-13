import React, { useContext, useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { dataContext } from "../App";
import img from "../images/fallBack.png";
// Landing Page Component
function LandingPage() {
  // UseContext State
  const user = useContext(dataContext);
  // Message State For No Data Found In Search Field
  const [message, setMessage] = useState(false);
  // On First Render Api Data Store Into Context State
  useEffect(() => {
    fetch("https://api.github.com/users")
      .then((response) => response.json())
      .then((val) => {
        if (user.data.length === 0) {
          user.setData(val);
          user.setClone(val);
        } else {
          user.setData([...user.data]);
          user.setClone([...user.clone]);
        }
      })
      .catch((err) => console.log(err.message));
  }, []);
  // Search Handler Function
  const searchHandler = (e) => {
    // Make a local array
    let temp = [];
    if (e.target.value.length >= 2) {
      for (let i = 0; i < user.clone.length; i++) {
        if (
          user.clone[i].login
            .toLowerCase()
            .startsWith(e.target.value.toLowerCase())
        ) {
          temp.push(user.clone[i]);
          setMessage(false);
        } else {
          setMessage(true);
        }
      }
      user.setData(temp);
    } else if (e.target.value.length === 0) {
      user.setData(user.clone);
      setMessage(false);
    }
  };
  return (
    <section>
      <div className="sidebar">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasLabel">
            Your Contacts
          </h5>
        </div>
        <div className="offcanvas-body">
          <div className="input-group flex-nowrap">
            <span className="input-group-text" id="addon-wrapping">
              <i className="fas fa-search"></i>
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              aria-label="Username"
              aria-describedby="addon-wrapping"
              onChange={searchHandler}
            />
            <Link
              state={{ from: "" }}
              to={"/addEdit"}
              type="button"
              className="btn btn-dark ms-3"
            >
              New
            </Link>
          </div>
          <br></br>
          {/* Conditional Rendering */}
          {user.data.length === 0 && message === false ? (
            <center>
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </center>
          ) : (
            <div className="list-group">
              {user.data.map((val, index) => (
                <Link
                  key={index}
                  to={"/contact"}
                  className="list-group-item list-group-item-action p-3 m-2"
                  aria-current="true"
                  // Pass Data Into Component
                  state={{ from: val }}
                >
                  {val.login}
                </Link>
              ))}
            </div>
          )}
          <br></br>
          {/* Fallback Image */}
          <center>
            {message === true && user.data.length === 0 ? (
              <img
                style={{ width: "70%", margin: "auto" }}
                src={img}
                alt="fall_back"
              />
            ) : null}
          </center>
        </div>
      </div>
      <div>
        <Outlet />
      </div>
    </section>
  );
}

export default LandingPage;
