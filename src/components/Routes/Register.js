import React, { useState } from "react";
import { useEffect } from "react";
import { auth, db, timestamp } from "../../firebase/firebase";
import { useAuth } from "../../hooks/auth";
import { useHistory } from "react-router-dom";
import { SignNavCorner } from "../Misc/SignNavCorner";
import { InfoBanner } from "../InfoBanner/InfoBanner";

const Register = () => {
  const history = useHistory();
  const [user] = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [bannerIn, setBannerIn] = useState(false);
  const [bannerMessage, setBannerMessage] = useState("");

  const signUp = async () => {
    try {
      const userCredential = await auth.createUserWithEmailAndPassword(
        email,
        password
      );

      await userCredential.user.updateProfile({
        displayName: username,
      });
      console.log(auth.currentUser);

      //TODO: Fix firebase permissions
      await db.collection("users").add({
        username: username,
        dateCreated: timestamp.now(),
      });
      history.push("/");
    } catch (e) {
      /* handle error */
      console.error(e.message);
      setBannerIn(true);
      setBannerMessage(e.message);
    }
  };

  useEffect(() => {}, []);
  return (
    <>
      <InfoBanner in={bannerIn} message={bannerMessage} />
      <div className="registration-screen">
        <div className="registration-card-container">
          <div className="registration-pagetitle">Register</div>
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
            <input
              className="registration-input"
              onChange={(event) => setUsername(event.target.value)}
              placeholder="Username"
              value={username}
            />
          </div>
          <button
            type="submit"
            onClick={signUp}
            className="registration-submitbutton"
          >
            Submit
          </button>
        </div>
        <SignNavCorner name="Login" path="/login" />
      </div>
    </>
  );
};

export { Register };
