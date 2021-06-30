import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Home } from "./components/Routes/Home";
import { Login } from "./components/Routes/Login";
import { Register } from "./components/Routes/Register";
import { Grommet } from "grommet";
import { theme } from "./GrommetTheme";

const App = () => {
  return (
    <Grommet theme={theme}>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </Switch>
      </Router>
    </Grommet>
  );
};

export { App };
