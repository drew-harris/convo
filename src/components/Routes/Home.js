import React from "react";
import { useState } from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { useEffect } from "react";
import { analytics, auth, remoteConfig } from "../../firebase/firebase";
import { useHistory } from "react-router";

import { Groups } from "../HomeRoutes/Groups/Groups";
import { Feed } from "../HomeRoutes/Feed/Feed";
import { FORCE_ALLOW_APP } from "../../constants";

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
        analytics.setUserProperties({ username: user.displayName });
        setUserLoaded(true);
      }
    });

    if (window.matchMedia("(display-mode: standalone)").matches) {
      analytics.setUserProperties({ pwa: "Installed" });
    } else {
      analytics.setUserProperties({ pwa: "Not installed" });
      setShowInstallPopup(true);
    }
  }, [history]);

  const appEnabled = remoteConfig.getBoolean("app_enabled");

  if (!userLoaded) {
    return null;
  } else if (appEnabled || FORCE_ALLOW_APP) {
    return (
      <>
        <div className="transition-background"></div>
        <Router>
          <Switch>
            <Route exact path="/groups" component={Groups} />
            <Route exact path="/groups/:id" component={GroupView} />
            <Route exact path="/" component={Feed} />
          </Switch>
        </Router>
        <Navbar />
        {showInstallPopup ? <InstallPopup /> : null}
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
