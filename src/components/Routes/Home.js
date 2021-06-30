import React from "react";
import { useEffect } from "react";
import { auth } from "../../firebase/firebase";
import { Box, Text, Main, Button } from "grommet";
import { useAuth } from "../../hooks/auth";
import { useHistory } from "react-router";

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

  if (!user) {
    return null;
  } else {
    return (
      <Main>
        <Box>
          <Text>HomePage</Text>
          <Button onClick={() => auth.signOut()}> Log out</Button>
        </Box>
      </Main>
    );
  }
};

export { Home };
