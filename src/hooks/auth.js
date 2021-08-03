import { auth } from "../firebase/firebase";
import { useState, useEffect } from "react";

const useAuth = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => {
      console.log("CLEANUP RAN");
    };
  }, []);

  return [user];
};

export { useAuth };
