import React, { useState, useEffect, Fragment } from "react";
import Header from "../includes/header";
import { MDBDataTable } from "mdbreact";

function UserList(props) {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      let userData = JSON.parse(localStorage.getItem("CurrentUserData"));
      let rowsData = [];
      let allData = {
        columns: [
          {
            label: "First Name",
            field: "fname",
          },
          {
            label: "Last Name",
            field: "lname",
          },
          {
            label: "Email",
            field: "email",
          },
        ],
        rows: rowsData,
      };

      for (var i = 1; i <= 100; i++) {
        rowsData.push({
          fname: userData.fname + i,
          lname: userData.lname + i,
          email: userData.email,
        });
      }
      setData(allData);
    }
    fetchData();
  }, []);

  return (
    <Fragment>
      <div className="user_list">
        <Header />
        <MDBDataTable striped bordered small data={data} className="table_sec" />
      </div>
    </Fragment>
  );
}

export default UserList;
