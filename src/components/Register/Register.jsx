import axios from "axios";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";

import { FcGoogle } from "react-icons/fc";

const Register = () => {
  const { createUser, updateUserProfile, signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/";

  const handleRegister = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const photo = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;

    console.log(name, photo, email, password);

     if (password.length < 8) {
       Swal.fire({
         icon: "warning",
         title: "Invalid Password",
         text: "Password must be at least 8 characters long",
       });
       return;
     }

    createUser(email, password)
      .then((result) => {
        const createUser = result.user;
        console.log(createUser);

        updateUserProfile(name, photo)
          .then(() => {
            const saveUser = { name: name, email: email };
            fetch(`${import.meta.env.VITE_API_URL}/users`, {
              method: "POST",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify(saveUser),
            })
              .then((res) => res.json())
              .then((data) => {
                if (data.insertedId) {
                  form.reset();
                  Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "User created successfully.",
                    showConfirmButton: false,
                    timer: 1500,
                  });
                  navigate("/"); // Redirect to the home page
                }
              });
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }; 

  const handleGoogleSingIn = () => {
    signInWithGoogle().then((result) => {
      const loggedUser = result.user;
      console.log(loggedUser);

      const saveUser = {
        name: loggedUser.displayName,
        email: loggedUser.email,
      };
      fetch(`${import.meta.env.VITE_API_URL}/users`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(saveUser),
      })
        .then((res) => res.json())
        .then(() => {
          navigate(from, { replace: true }); // Redirect to the home page
        })
    })
  }


  return (
    <div className="row d-flex align-items-center justify-content-center mb-4">
      <div className="col-md-8">
        <h1 className="p-3 text-center">Register Page</h1>
        <form onSubmit={handleRegister}>
          {/* name */}
          <div className="mb-3">
            <label htmlFor="exampleInputName1" className="form-label">
              Name
            </label>
            <input
              name="name"
              type="text"
              placeholder="Type Your Name"
              className="form-control"
              id="exampleInputName1"
              aria-describedby="nameHelp"
              required
            />
          </div>
          {/* photo url */}
          <div className="mb-3">
            <label htmlFor="exampleInputName1" className="form-label">
              photo URL
            </label>
            <input
              name="photo"
              type="text"
              className="form-control"
              id="exampleInputName1"
              aria-describedby="nameHelp"
              placeholder="Give your Photo URL"
              required
            />
          </div>
          {/* email */}
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              name="email"
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Type your Email"
              required
            />
          </div>
          {/* password */}
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              name="password"
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Type your Password"
              required
            />
          </div>

          <input
            style={{ width: "100%" }}
            type="submit"
            value="Register"
            className="btn btn-primary"
          />
        </form>

        <div>
          <p>
            <small>
              Already have an account <Link to="/login">Login</Link>
            </small>
          </p>
        </div>

        {/* google login */}
        <button
          onClick={handleGoogleSingIn}
          style={{ width: "100%" }}
          className="px-5 py-2 mt-3 border border-white"
        >
          <FcGoogle
            style={{ height: "32px", width: "32px" }}
            className="me-2"
          ></FcGoogle>
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default Register;
