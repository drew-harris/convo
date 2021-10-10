import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { Home } from "./components/Routes/Home";
import { Login } from "./components/Routes/Login";
import { UserList } from "./components/Routes/UserList/UserList";
import { Register } from "./components/Routes/Register";
import "./App.scss";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login" cumponent={Login} />
        <Route path="/register" component={Register} />
        <Route path="/users" component={UserList} />
        <Route path="/" component={Home} />
      </Switch>
    </Router>
  );
};

export { App };
