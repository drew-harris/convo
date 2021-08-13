import { auth } from "../firebase/firebase";
import { useState, useEffect } from "react";

const useAuth = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const cleanup = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => {
      cleanup();
    };
  }, []);

  return [user];
};

export { useAuth };
