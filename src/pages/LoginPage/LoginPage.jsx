import "./LoginPage.css";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import authService from "../../services/auth.service";
import { Button } from "react-bootstrap";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBBtn,
} from "mdb-react-ui-kit";
import loginImage from "../../images/login-img.jpg";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };

    authService
      .login(requestBody)
      .then((response) => {
        storeToken(response.data.authToken);
        authenticateUser();
        navigate("/");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <>
      <MDBContainer fluid>
        <MDBRow>
          <MDBCol sm="6">
            <div className="d-none d-sm-block px-0">
            </div>

            <div className="d-flex flex-column align-items-center h-custom-2 w-100 pt-4">
              <h3 className="login-title" style={{ letterSpacing: "1px" }}>
                Log in
              </h3>
              <form className="w-50" onSubmit={handleLoginSubmit}>
                <div class="sign-form-div mb-4">
                  <label for="exampleInputEmail1">Email address</label>
                  <input
                    type="email"
                    class="form-control w-100"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                    size="lg"
                    name="email"
                    value={email}
                    onChange={handleEmail}
                  ></input>
                </div>
                <div class="sign-form-div mb-4">
                  <label for="exampleInputPassword1">Password</label>
                  <input
                    type="password"
                    class="form-control w-100"
                    id="exampleInputPassword1"
                    placeholder="Password"
                    value={password}
                    size="lg"
                    onChange={handlePassword}
                  ></input>
                </div>
                <MDBBtn
                  type="submit"
                  className="login-button"
                  color="dark"
                  size="lg"
                >
                  Login
                </MDBBtn>
                {errorMessage && (
                  <p className="error-message">{errorMessage}</p>
                )}
                <p>
                  Don't have an account? <a href="/signup">Register here</a>
                </p>
                <div className="d-flex flex-row ps-5 pt-5"></div>
              </form>
            </div>
          </MDBCol>

          <MDBCol sm="6" className="d-none d-sm-block px-0">
            <img
              src={loginImage}
              alt="login"
              className="w-100"
              style={{ objectFit: "cover", objectPosition: "left" }}
            />
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </>
  );
}

export default LoginPage;
