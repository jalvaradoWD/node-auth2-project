import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavBar from "./components/NavBar";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import UsersList from "./components/UsersList";
import { useEffect, useState } from "react";

const App = () => {
  const [tokenExist, setTokenExist] = useState();

  useEffect(() => {
    localStorage.getItem("token") ? setTokenExist(true) : setTokenExist(false);
  }, [setTokenExist]);

  return (
    <Router>
      <NavBar tokenExist={tokenExist} setTokenExist={setTokenExist} />
      <h1>Home Route</h1>

      <Switch>
        <Route
          exact
          path="/signin"
          render={() => <SignIn setTokenExist={setTokenExist} />}
        />
        <Route
          exact
          path="/signup"
          render={() => <SignUp setTokenExist={setTokenExist} />}
        />
        <Route exact path="/users" component={UsersList} />
      </Switch>
    </Router>
  );
};

export default App;
