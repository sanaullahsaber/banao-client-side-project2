import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../Providers/AuthProvider';

const Header = () => {
  const { user, logOut } = useContext(AuthContext);

  const handleLogOut = () => {
    logOut()
      .then()
    .catch((error) => console.log(error))
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo03"
            aria-controls="navbarTogglerDemo03"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <Link to="/">
            <a className="navbar-brand">Social Media</a>
          </Link>

          <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/">
                  <a className="nav-link active" aria-current="page">
                    Home
                  </a>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/register">
                  <a className="nav-link active" aria-current="page">
                    Register
                  </a>
                </Link>
              </li>
              <li className="nav-item">
                {user ? (
                  <Link onClick={handleLogOut}>
                    <a className="nav-link active" aria-current="page">
                      Logout
                    </a>
                  </Link>
                ) : (
                  <Link to="/login">
                    <a className="nav-link active" aria-current="page">
                      Login
                    </a>
                  </Link>
                )}
              </li>
              <li>
                {user ? (
                  <span style={{ width: "1000px" }}>
                    <img
                      style={{ height: "36px", width: "36px" }}
                      className="rounded-circle"
                      src={user.photoURL}
                      alt=""
                    />
                  </span>
                ) : ""}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;