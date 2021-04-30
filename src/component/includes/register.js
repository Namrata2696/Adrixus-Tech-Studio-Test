import React, { useState, Fragment } from "react";
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
} from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SimpleReactValidator from "simple-react-validator";

function Register(props) {
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

  const onRegister = async () => {
    const formValid = simpleValidator.current.allValid();
    if (formValid && doValidate()) {
      var hashedPassword = passwordHash.generate(data.password);
      console.log("hashedPassword::", hashedPassword);

      const registerdata = {
        email: data.email,
        password: hashedPassword,
        firstname: data.fname,
        lastname: data.lname,
      };

      let registerdUsers = localStorage.getItem("registerdUsers")
        ? JSON.parse(localStorage.getItem("registerdUsers"))
        : [];

      if (registerdUsers.length > 0) {
        registerdUsers.map((item, index) => {
          if (item.email === data.email) {
            toast.error("User already register.");
          } else {
            setData({
              ...data,
              isSubmitting: false,
            });
            localStorage.setItem(
              "registerdUsers",
              JSON.stringify(registerdUsers)
            );
            toast.success("Register successfully");
            window.location.href = "/signin";
          }
        });
      } else {
        setData({
          ...data,
          isSubmitting: false,
        });
        localStorage.setItem("registerdUsers", JSON.stringify(registerdUsers));
        toast.success("Register successfully");
        window.location.href = "/signin";
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

  const onLogin = () => {
    window.location.href = "/signin";
  };

  return (
    <Fragment>
      <Card className="login">
        <CardBody>
          <Form>
            <h1>Register</h1>
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
                  {simpleValidator.current.message(
                    "Password",
                    data.password,
                    "required"
                  )}
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <FormGroup className="fname">
                  <Label for="fname">First Name</Label>
                  <Input
                    id="fname"
                    // defaultValue=''
                    value={data.fname}
                    onChange={(e) =>
                      setData({ ...data, fname: e.target.value })
                    }
                    onBlurCapture={() =>
                      simpleValidator.current.showMessageFor("First Name")
                    }
                  />
                  {simpleValidator.current.message(
                    "First Name",
                    data.fname,
                    "required"
                  )}
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <FormGroup className="lname">
                  <Label for="lname">Last Name</Label>
                  <Input
                    id="lname"
                    // defaultValue={data.lname}
                    value={data.lname}
                    onChange={(e) =>
                      setData({ ...data, lname: e.target.value })
                    }
                    onBlurCapture={() =>
                      simpleValidator.current.showMessageFor("Last Name")
                    }
                  />
                  {simpleValidator.current.message(
                    "Last Name",
                    data.lname,
                    "required"
                  )}
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <FormGroup>
                  <Button
                    className="btn-success btn"
                    style={{ width: "100%" }}
                    onClick={() => onRegister()}
                  >
                    {data.isSubmitting ? "Loading..." : "Sign up"}
                  </Button>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              You have already account?{" "}
              <a href="#" onClick={() => onLogin()}>
                Signin
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

export default Register;
