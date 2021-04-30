import "./component/assets/css/style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./component/includes/login";
import Register from "./component/includes/register";
import UserList from "./component/pages/userList";
import { Redirect, Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { Fragment } from "react";

function App() {
  const authToken = localStorage.getItem("UserAuthToken");
// console.log
  return (
    <div className="App">
      <Router>
        <Switch>
          {((authToken && authToken === "") || !authToken) && (
            <Fragment>
              <Route path="/signin" component={Login} />
              <Route path="/signup" component={Register} />
              <Route exact path="/" render={() => <Redirect to="/signin" />} />
              <Route
                exact
                path="/userlist"
                render={() => <Redirect to="/signin" />}
              />
            </Fragment>
          )}
          {authToken && authToken !== "" && (
            <Fragment>
              <Route path="/userlist" component={UserList} />
              <Route
                exact
                path="/signin"
                render={() => <Redirect to="/userlist" />}
              />
              <Route
                exact
                path="/signup"
                render={() => <Redirect to="/userlist" />}
              />
              <Route
                exact
                path="/"
                render={() => <Redirect to="/userlist" />}
              />
            </Fragment>
          )}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
