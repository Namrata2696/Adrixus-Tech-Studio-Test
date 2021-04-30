import React, { useState, useEffect, Fragment } from "react";
import { Row, Col, Button } from "reactstrap";

function Header(props) {

  const logout = () => {
    localStorage.removeItem("CurrentUserData");
    localStorage.removeItem("UserAuthToken");
    window.location.href="/";
  };

  var Fname = JSON.parse(localStorage.getItem("CurrentUserData")).fname;
  var Lname = JSON.parse(localStorage.getItem("CurrentUserData")).lname;

  return (
    <Fragment>
      <Row className="header_cls">
        <Col lg={8} md={8}></Col>
        <Col lg={3} md={3}>
          <p> Hi, {Fname} {Lname}</p>
        </Col>
        <Col lg={1} md={1}>
          <Button
            className="btn btn-md"
            color="success"
            onClick={() => logout()}
          >
            Logout
          </Button>
        </Col>
      </Row>
    </Fragment>
  );
}

export default Header;
