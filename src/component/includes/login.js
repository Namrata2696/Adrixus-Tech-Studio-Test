import React, { useState, useEffect, Fragment } from "react";
import { useRef } from "react";
import {
  Row,
  Col,
  Card,
  CardBody,
  Button,
  Form,
  Label,
  FormGroup,
  Input,
  CardHeader,
} from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SimpleReactValidator from "simple-react-validator";

function Login(props) {
  const simpleValidator = useRef(
    new SimpleReactValidator(
      {
        element: (message, className) => (
          <div className="required_message">{message}</div>
        ),
      },
      { autoForceUpdate: this }
    )
  );
  const [, forceUpdate] = useState();
  var passwordHash = require("password-hash");

  const initialState = {
    email: "",
    password: "",
    fname: "",
    lname: "",
    isSubmitting: false,
    login_status: "",
    login_message: "",
  };
  const [data, setData] = useState(initialState);
  const [EmailMessage, setEmailMessage] = useState("");

  const onLogin = async () => {
    const formValid = simpleValidator.current.allValid();
    if (doValidate()) {
      const logindata = { email: data.email, password: data.password };
      let registerdUsers = localStorage.getItem("registerdUsers")
        ? JSON.parse(localStorage.getItem("registerdUsers"))
        : [];

      if (registerdUsers.length > 0) {
        registerdUsers.map((item, index) => {
          if (
            item.email === data.email &&
            passwordHash.verify(logindata.password, item.password)
          ) {
            setData({
              ...data,
              isSubmitting: false,
            });
            toast.success("Login successfully");
            localStorage.setItem("UserAuthToken", Math.random(10));
            localStorage.setItem(
              "CurrentUserData",
              JSON.stringify({
                email: logindata.email,
                fname: item.firstname,
                lname: item.lastname,
              })
            );

            window.location.href = "/";
          } else if (item.email === data.email) {
            toast.error("UserName or password was wrong!");
          } else {
            toast.error("User is not exist.");
          }
        });
      } else {
        toast.error("User is not exist.");
      }
    } else {
      simpleValidator.current.showMessages();
      forceUpdate(1);
    }
  };

  function validateEmail(email) {
    //Validates the email address
    var emailRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    // var phoneRegex = /^\d{0,12}$/;
    if (email.match(emailRegex)) {
      return true;
    } else {
      return false;
    }
  }

  const doValidate = () => {
    if (!validateEmail(data.email)) {
      setEmailMessage("Please Enter Correct Email.");
      return false;
    } else {
      setEmailMessage("");
      return true;
    }
  };

  const onRegister = () => {
    window.location.href = "/signup";
  };

  return (
    <Fragment>
      <Card className="login">
        <CardBody>
          <Form>
          <h1>Login</h1>
            <Row>
              <Col md={12}>
                <FormGroup>
                  <Label for="email">Email</Label>
                  <Input
                    type="text"
                    id="email"
                    placeholder="Enter Email"
                    value={data.email}
                    onChange={(e) =>
                      setData({ ...data, email: e.target.value })
                    }
                    onBlurCapture={() =>
                      simpleValidator.current.showMessageFor("Email")
                    }
                  />
                  {data.email !== "" && (
                    <div className="required_message">{EmailMessage}</div>
                  )}
                  {simpleValidator.current.message(
                    "Email",
                    data.email,
                    "required"
                  )}
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <FormGroup className="password_login">
                  <Label for="password">Password</Label>
                  <Input
                    type={data.showPass ? "text" : "password"}
                    id="password"
                    placeholder="Enter Password"
                    value={data.password}
                    onChange={(e) =>
                      setData({ ...data, password: e.target.value })
                    }
                    onBlurCapture={() =>
                      simpleValidator.current.showMessageFor("Password")
                    }
                  />
                  <i
                    className={data.showPass ? "fa fa-eye" : "fa fa-eye-slash"}
                    onClick={() =>
                      setData({ ...data, showPass: !data.showPass })
                    }
                  ></i>
                  {simpleValidator.current.message(
                    "Password",
                    data.password,
                    "required"
                  )}
                </FormGroup>
              </Col>
            </Row>
            {/* <Row>
            <Col md={12}>
              <FormGroup className="fname">
                <Label for="fname">First Name</Label>
                <Input id="fname" defaultValue="" value={data.fname}
                onClick={(e) =>
                  setData({ ...data, fname: e.target.value })
                } />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <FormGroup className="lname">
                <Label for="lname">Last Name</Label>
                <Input id="lname" defaultValue="" value={data.lname}  onClick={(e) =>
                  setData({ ...data, fname: e.target.value })
                } />
              </FormGroup>
            </Col>
          </Row> */}
            <Row>
              <Col md={12}>
                <FormGroup>
                  <Button
                    className="btn-success btn"
                    style={{ width: "100%" }}
                    onClick={() => onLogin()}
                  >
                    {data.isSubmitting ? "Loading..." : "Sign in"}
                  </Button>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              You have not account?{" "}
              <a href="#" onClick={() => onRegister()}>
                Signup
              </a>
            </Row>
          </Form>
        </CardBody>
      </Card>
      <ToastContainer
        position="top-right"
        autoClose={7000}
        newestOnTop={false}
        closeOnClick={true}
        hideProgressBar={false}
        // rtl={false}
        //transition= "bounce" //zoom, silde, bounce, flip
        pauseOnVisibilityChange={false}
        draggable={false}
        // pauseOnHover
      />
    </Fragment>
  );
}

export default Login;
