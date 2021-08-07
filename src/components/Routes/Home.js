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
import { HypeScreen } from "./HypeScreen/HypeScreen";
import { InstallPopup } from "../Misc/InstallPopup";

const Home = () => {
  let history = useHistory();

  const [userLoaded, setUserLoaded] = useState(false);
  const [showInstallPopup, setShowInstallPopup] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        history.push("/login");
      } else {
        setUserLoaded(true);
      }
    });

    if (window.matchMedia("(display-mode: standalone)").matches) {
      console.log("installed");
    } else {
      console.log("NEED TO INSTALL");
      setShowInstallPopup(true);
    }
  }, [history]);

  console.log(remoteConfig.getBoolean("app_enabled"));
  const appEnabled = remoteConfig.getBoolean("app_enabled");
  console.log("APP ENABLED: ", appEnabled);

  if (!userLoaded) {
    return null;
  } else if (appEnabled) {
    return (
      <>
        {showInstallPopup ? <InstallPopup /> : null}
        <div className="transition-background">testing</div>
        <Router>
          <Switch>
            <Route exact path="/groups" component={Groups} />
            <Route exact path="/groups/:id" component={GroupView} />
            <Route exact path="/" component={Feed} />
          </Switch>
        </Router>
        <Navbar />
      </>
    );
  } else {
    return (
      <>
        {showInstallPopup ? <InstallPopup /> : null}
        <HypeScreen />
      </>
    );
  }
};

export { Home };
