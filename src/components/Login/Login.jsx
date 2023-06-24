import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../../Providers/AuthProvider";
import Swal from "sweetalert2";
const Login = () => {
  const { signIn, signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/";

  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    if (password.length < 8) {
      Swal.fire({
        icon: "error",
        title: "Invalid Password",
        text: "Password must be at least 8 characters long",
      });
      return;
    }

    console.log(email, password);

    signIn(email, password).then((result) => {
      const user = result.user;
      console.log(user);
      Swal.fire({
        title: "User Login Successful.",
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
      });
      navigate(from, { replace: true });
    })
  }

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
         });
     });
   };

  return (
    <div className="row d-flex align-items-center justify-content-center mb-4">
      <div className="col-md-8">
        <h1 className="p-3 text-center">Login Page</h1>
        <form onSubmit={handleLogin}>
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
            value="Login"
            className="btn btn-primary"
          />
        </form>

        <div>
          <p>
            <small>
              New Here? <Link to="/register">Register an account</Link>
            </small>
          </p>
        </div>
        <div>
          <p>
            <small>
              <Link to="/reset-password">Forget the password</Link>
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

export default Login;
