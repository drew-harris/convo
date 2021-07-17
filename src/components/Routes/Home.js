import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { useEffect } from "react";
import { auth } from "../../firebase/firebase";
import { useAuth } from "../../hooks/auth";
import { useHistory } from "react-router";

import { Groups } from "../HomeRoutes/Groups/Groups";
import { Feed } from "../HomeRoutes/Feed";
import { Settings } from "../HomeRoutes/Settings";

import { Navbar } from "../Navbar/Navbar";

const Home = () => {
  const user = useAuth();
  let history = useHistory();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        history.push("/login");
      }
    });
  }, []);

  if (!auth.currentUser) {
    return null;
  } else {
    return (
      <>
        <Router>
          <Switch>
            <Route path="/groups" component={Groups} />
            <Route path="/settings" component={Settings} />
            <Route exact path="/" component={Feed} />
          </Switch>
        </Router>
        <Navbar />
      </>
    );
  }
};

export { Home };
