import "./SignupPage.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../services/auth.service";
import { Button } from "react-bootstrap";
import { MDBContainer, MDBRow, MDBCol, MDBIcon } from "mdb-react-ui-kit";
import signupImage from "../../signup.jpg";

function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    // Create an object representing the request body
    const requestBody = { email, password, name };

    // Send a request to the server using axios
    /* 
    const authToken = localStorage.getItem("authToken");
    axios.post(
      `${process.env.REACT_APP_SERVER_URL}/auth/signup`, 
      requestBody, 
      { headers: { Authorization: `Bearer ${authToken}` },
    })
    .then((response) => {})
    */

    // Or using a service
    authService
      .signup(requestBody)
      .then((response) => {
        // If the POST request is successful redirect to the login page
        navigate("/login");
      })
      .catch((error) => {
        // If the request resolves with an error, set the error message in the state
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <>
      <MDBContainer fluid>
        <MDBRow>
          <MDBCol sm="6" className="d-none d-sm-block px-0">
            <img
              src={signupImage}
              alt="signup"
              className="w-100"
              style={{ objectFit: "cover", objectPosition: "left" }}
            />
          </MDBCol>
          <MDBCol sm="6">
            <div className="d-flex flex-row ps-5 pt-5">
              <MDBIcon style={{ color: "#709085" }} />
            </div>

            <div className="d-flex flex-column align-items-center h-custom-2 w-100 pt-4">
              <h3 className="signIn-title" style={{ letterSpacing: "1px" }}>
                Sign Up
              </h3>
              <form onSubmit={handleSignupSubmit}>
                <div className="sign-form-div">
                  <label for="exampleInputName1">Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputName1"
                    aria-describedby="nameHelp"
                    placeholder="Enter name"
                    size="lg"
                    name="name"
                    value={name}
                    onChange={handleName}
                  />
                </div>
                <div className="sign-form-div">
                  <label for="exampleInputEmail1">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                    size="lg"
                    name="email"
                    value={email}
                    onChange={handleEmail}
                  ></input>
                </div>
                <div className="sign-form-div">
                  <label for="exampleInputPassword1">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="exampleInputPassword1"
                    placeholder="Password"
                    value={password}
                    size="lg"
                    onChange={handlePassword}
                  ></input>
                </div>
                <Button type="submit" className="signIn-button" size="lg">
                  Sign Up
                </Button>
                {errorMessage && (
                  <p className="error-message">{errorMessage}</p>
                )}
                <p>
                  Already have an account? <br />
                  <a href="/login">Log In here</a>
                </p>
              </form>
            </div>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </>
  );
}

export default SignupPage;
