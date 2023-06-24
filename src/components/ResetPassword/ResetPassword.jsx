import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Providers/AuthProvider';

const ResetPassword = () => {
  const { resetPassword } = useContext(AuthContext);

  const handleResetPassword = async (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    console.log(email);

     try {
      await resetPassword(email);
      console.log('Password reset email sent');
      // Handle success or show a success message to the user
    } catch (error) {
      console.log('Error sending password reset email', error);
      // Handle error or show an error message to the user
    }
  };

  return (
    <div className="row d-flex align-items-center justify-content-center mb-4">
      <div className="col-md-8">
        <h1 className="p-3 text-center">Reset Password Page</h1>
        <form onSubmit={handleResetPassword}> 
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
         
          <input
            style={{ width: "100%" }}
            type="submit"
            value="Reset My Password"
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
      </div>
    </div>
  );
};

export default ResetPassword;