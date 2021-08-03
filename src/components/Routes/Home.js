import React from "react";
import { useState } from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { useEffect } from "react";
import { auth, remoteConfig } from "../../firebase/firebase";
import { useHistory } from "react-router";

import { Groups } from "../HomeRoutes/Groups/Groups";
import { Feed } from "../HomeRoutes/Feed/Feed";

import { Navbar } from "../Navbar/Navbar";
import { GroupView } from "../HomeRoutes/GroupView/GroupView";

const Home = () => {
  let history = useHistory();

  const [userLoaded, setUserLoaded] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        history.push("/login");
      } else {
        setUserLoaded(true);
      }
    });
  }, [history]);
  const appEnabled = remoteConfig.getBoolean("app_enabled");
  console.log(appEnabled);
  console.log(remoteConfig.lastFetchStatus);

  if (!userLoaded) {
    return null;
  } else if (appEnabled) {
    return (
      <>
        <Router>
          <Switch>
            <Route path="/groups/:id" component={GroupView} />
            <Route path="/groups" component={Groups} />
            <Route exact path="/" component={Feed} />
          </Switch>
        </Router>
        <Navbar />
      </>
    );
  } else {
    return <h1>Hype</h1>;
  }
};

export { Home };
