import React from "react";
import { useState } from "react";
import { auth } from "../../firebase/firebase";
import { useHistory } from "react-router-dom";

import { SignNavCorner } from "../Misc/SignNavCorner";
import { InfoBanner } from "../InfoBanner/InfoBanner";
import "./registration.scss";
const Login = () => {
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bannerIn, setBannerIn] = useState(false);
  const [bannerMessage, setBannerMessage] = useState("");

  const logIn = async () => {
    try {
      const credential = await auth.signInWithEmailAndPassword(email, password);
      console.log(credential.user.displayName);
      history.push("/");
    } catch (e) {
      console.log(e.message);
      /* handle error */
      setBannerIn(true);
      setBannerMessage(e.message);
    }
  };

  return (
    <>
      <InfoBanner in={bannerIn} message={bannerMessage} />
      <div className="registration-screen">
        <div className="registration-card-container">
          <div className="registration-pagetitle">Log In</div>
          <div className="registration-input-container">
            <input
              className="registration-input"
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Email"
              value={email}
            />
            <input
              className="registration-input"
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Password"
              type="password"
              value={password}
            />
          </div>
          <button
            type="submit"
            onClick={logIn}
            className="registration-submitbutton"
          >
            Submit
          </button>
        </div>
        <SignNavCorner name="Register" path="/register" />
      </div>
    </>
  );
};

export { Login };
